import chalk from "chalk";
export function showUnusedFiles(categories) {
    console.log(chalk.red("\n❌ Arquivos Não Utilizados:\n"));
    Object.entries(categories).forEach(([category, files]) => {
        if (files.length > 0) {
            console.log(chalk.yellow(`📂 ${category.toUpperCase()} (${files.length}):`));
            files.forEach((file) => console.log(chalk.red(`  ❌ ${file}`)));
            console.log("");
        }
    });
}
export function showSummary(totalFiles, unusedFiles) {
    const orphanPercentage = ((unusedFiles.length / totalFiles) * 100).toFixed(2);
    const usedPercentage = (100 - Number(orphanPercentage)).toFixed(2);
    console.log(chalk.yellow("\n📊 Resumo Final:\n"));
    console.log(chalk.blue(`| Total de Arquivos | Órfãos | % Código Utilizado | % Código Morto |`));
    console.log(chalk.blue(`|------------------|--------|------------------|--------------|`));
    console.log(chalk.green(`| ${totalFiles.toString().padEnd(16)} | ${unusedFiles.length
        .toString()
        .padEnd(6)} | ${usedPercentage.toString().padEnd(16)}% | ${orphanPercentage
        .toString()
        .padEnd(12)}% |`));
    console.log("\n");
}
export function showBrokenImports(brokenImports) {
    console.log(chalk.yellow("\n🔎 Checking for broken imports...\n"));
    if (brokenImports.length === 0) {
        console.log(chalk.green("✅ No broken imports found!\n"));
    }
    else {
        console.log(chalk.bgRed("\n🚨 Broken Imports Detected:\n"));
        brokenImports.forEach((imp) => console.log(chalk.red(`  ❌ ${imp}`)));
        console.log("");
    }
}
