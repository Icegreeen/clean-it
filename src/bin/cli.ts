#!/usr/bin/env node

import { analyzeProject } from "../index.js";
import { showSummary, showUnusedFiles, showBrokenImports } from "../utils/display.js";
import { showLoading } from "../utils/loader.js";

const targetPath = process.argv[2] || ".";

await showLoading("Analisando o projeto...");

const report = analyzeProject(targetPath);
const { totalFiles, unusedFiles, brokenImports } = report;

const categories = {
  components: [],
  pages: [],
  utils: [],
  public: [],
  styles: [],
  other: [],
};

unusedFiles.forEach((file) => {
  if (file.includes("/components/")) categories.components.push(file);
  else if (file.includes("/pages/")) categories.pages.push(file);
  else if (file.includes("/utils/")) categories.utils.push(file);
  else if (file.includes("/public/")) categories.public.push(file);
  else if (file.endsWith(".css")) categories.styles.push(file);
  else categories.other.push(file);
});

showUnusedFiles(categories);

showBrokenImports(brokenImports);

showSummary(totalFiles, unusedFiles);