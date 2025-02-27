import fs from "fs";
import path from "path";
import chalk from "chalk";
export function validateProjectPath(targetPath) {
    if (!fs.existsSync(targetPath)) {
        console.log(chalk.red("❌ Error: The specified path does not exist."));
        return false;
    }
    const packageJsonPath = path.join(targetPath, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        console.log(chalk.red("⚠️ Warning: This does not seem to be a frontend project (missing package.json)."));
        return false;
    }
    return true;
}
