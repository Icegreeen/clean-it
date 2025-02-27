#!/usr/bin/env node
/*
Explicação:

O usuário roda o script com npx clean-project ./meu-projeto.
Ele chama a função analyzeProject() e exibe o resultado formatado com cores bonitas.
*/
import chalk from "chalk";
import { analyzeProject } from "../index.js";
const targetPath = process.argv[2] || "."; // Caminho do projeto (padrão: diretório atual)
console.log(chalk.blue("🔍 Analisando o projeto..."));
const report = analyzeProject(targetPath);
console.log(chalk.green("\n📊 Relatório de Arquivos Não Utilizados:\n"));
report.unusedFiles.forEach((file) => console.log(chalk.red(`❌ ${file}`)));
console.log(chalk.yellow(`\n✅ Arquivos analisados: ${report.totalFiles}`));
console.log(chalk.green(`🟢 Arquivos utilizados: ${report.usedFiles}`));
console.log(chalk.red(`🔴 Arquivos órfãos: ${report.unusedFiles.length}`));
