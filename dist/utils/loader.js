import chalk from "chalk";
export async function showLoading(message = "Processando...") {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    process.stdout.write(chalk.blue(`\n🔍 ${message} `));
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            process.stdout.write(`\r🔍 ${chalk.blue(frames[i++ % frames.length])} ${message} `);
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
            process.stdout.write(`\r✅ ${chalk.green("Análise concluída!       \n")}`);
            resolve(true);
        }, 3000);
    });
}
