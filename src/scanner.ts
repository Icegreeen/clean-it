import fs from "fs";
import path from "path";

/*
- Varre o diretório de forma recursiva.
- Filtra apenas arquivos relevantes (.js, .ts, .tsx, .jsx, .css, .scss, .json, imagens).
- Garante que qualquer arquivo utilizável seja escaneado corretamente.
- Ignora arquivos irrelevantes como package.json, tsconfig.json, etc.
*/

const IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  ".git",
  "coverage",
]);

const IGNORED_FILES = new Set([
  "package.json",
  "package-lock.json",
  "yarn.lock",
  "tsconfig.json",
  ".gitignore",
  ".eslintignore",
  ".prettierrc",
  "README.md",
]);

const VALID_EXTENSIONS = /\.(js|jsx|ts|tsx|css|scss|json|png|jpg|jpeg|svg|gif|ico|webp|avif)$/;

export function scanProject(dir: string) {
  let files: string[] = [];

  function readDir(directory: string) {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!IGNORED_DIRS.has(file)) {
          readDir(fullPath);
        }
      } 

      else if (!IGNORED_FILES.has(file) && VALID_EXTENSIONS.test(file)) {
        files.push(fullPath);
      }
    });
  }

  readDir(dir);
  return files;
}
