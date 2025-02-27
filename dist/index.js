import { buildDependencyGraph } from "./graph.js";
import { scanProject } from "./scanner.js";
import path from "path";
export function analyzeProject(dir) {
    const files = scanProject(dir).map((file) => path.resolve(file)); // 🔹 Transforma arquivos analisados em absolutos
    const graph = buildDependencyGraph(files);
    const allFiles = new Set(files);
    const referencedFiles = new Set();
    // 🔹 Agora verificamos corretamente os arquivos referenciados
    Object.values(graph).forEach((deps) => {
        deps.forEach((dep) => {
            const resolvedDep = path.resolve(dep); // 🔹 Transforma dependência em absoluta antes da comparação
            if (allFiles.has(resolvedDep)) {
                referencedFiles.add(resolvedDep);
            }
        });
    });
    const unusedFiles = [...allFiles].filter((file) => !referencedFiles.has(file));
    return {
        totalFiles: allFiles.size,
        usedFiles: referencedFiles.size,
        unusedFiles,
    };
}
