// # Report generation

import chalk from "chalk";

export function printReport(report: any) {
  console.log(chalk.green("\n📊 Análise Completa\n"));
  console.log(chalk.yellow(`✅ Total de Arquivos: ${report.totalFiles}`));
  console.log(chalk.green(`🟢 Arquivos utilizados: ${report.usedFiles}`));
  console.log(chalk.red(`🔴 Arquivos órfãos: ${report.unusedFiles.length}\n`));

  if (report.unusedFiles.length > 0) {
    console.log(chalk.red("⚠️ Arquivos potencialmente não utilizados:"));
    report.unusedFiles.forEach((file: string) => console.log(chalk.red(`❌ ${file}`)));
  } else {
    console.log(chalk.green("🎉 Nenhum arquivo órfão encontrado!"));
  }
}
