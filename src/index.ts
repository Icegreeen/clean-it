import { buildDependencyGraph } from "./core/graph.js";
import { scanProject } from "./core/scanner.js";
import path from "path";

export function analyzeProject(dir: string) {
  const files = scanProject(dir).map((file) => path.resolve(file)); 
  const { dependencies, brokenImports } = buildDependencyGraph(files);

  const allFiles = new Set(files);
  const referencedFiles = new Set<string>();

  Object.values(dependencies).forEach((deps) => {
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
    brokenImports, 
  };
}
