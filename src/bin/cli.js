#!/usr/bin/env node

import chalk from "chalk";
import { analyzeProject } from "../index.js";
const targetPath = process.argv[2] || "."; 
console.log(chalk.blue("🔍 Analisando o projeto..."));
const report = analyzeProject(targetPath);
console.log(chalk.green("\n📊 Relatório de Arquivos Não Utilizados:\n"));
report.unusedFiles.forEach((file) => console.log(chalk.red(`❌ ${file}`)));
console.log(chalk.yellow(`\n✅ Arquivos analisados: ${report.totalFiles}`));
console.log(chalk.green(`🟢 Arquivos utilizados: ${report.usedFiles}`));
console.log(chalk.red(`🔴 Arquivos órfãos: ${report.unusedFiles.length}`));
