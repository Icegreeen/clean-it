import { buildDependencyGraph } from "./graph.js";
import { scanProject } from "./scanner.js";
import path from "path";

export function analyzeProject(dir) {
    const files = scanProject(dir).map((file) => path.resolve(file)); 
    const graph = buildDependencyGraph(files);
    const allFiles = new Set(files);
    const referencedFiles = new Set();
    Object.values(graph).forEach((deps) => {
        deps.forEach((dep) => {
            const resolvedDep = path.resolve(dep); 
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
