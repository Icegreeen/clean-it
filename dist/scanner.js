import fs from "fs";
import path from "path";
/*
Explicação:

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
// 🔹 Arquivos irrelevantes que não devem ser contados no relatório
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
// 🔹 Lista de extensões aceitas no escaneamento
const VALID_EXTENSIONS = /\.(js|jsx|ts|tsx|css|scss|json|png|jpg|jpeg|svg|gif|ico|webp|avif)$/;
export function scanProject(dir) {
    let files = [];
    function readDir(directory) {
        fs.readdirSync(directory).forEach((file) => {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);
            // 🔹 Ignora diretórios irrelevantes
            if (stat.isDirectory()) {
                if (!IGNORED_DIRS.has(file)) {
                    readDir(fullPath);
                }
            }
            // 🔹 Ignora arquivos irrelevantes
            else if (!IGNORED_FILES.has(file) && VALID_EXTENSIONS.test(file)) {
                files.push(fullPath);
            }
        });
    }
    readDir(dir);
    return files;
}
