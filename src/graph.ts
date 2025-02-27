import fs from "fs";
import path from "path";

export function buildDependencyGraph(files: string[]) {
  const dependencies: Record<string, Set<string>> = {};

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const imports = content.match(/import .* from ['"](.*)['"]/g) || [];

    dependencies[file] = new Set();

    imports.forEach((imp) => {
      const match = imp.match(/['"](.*)['"]/);
      if (match) {
        let importedPath = match[1];

        if (!importedPath.startsWith(".")) return;

        let resolvedPath = path.resolve(path.dirname(file), importedPath);

        if (!fs.existsSync(resolvedPath)) {
          if (fs.existsSync(resolvedPath + ".ts")) resolvedPath += ".ts";
          else if (fs.existsSync(resolvedPath + ".tsx")) resolvedPath += ".tsx";
          else if (fs.existsSync(resolvedPath + ".js")) resolvedPath += ".js";
          else if (fs.existsSync(resolvedPath + "/index.ts")) resolvedPath += "/index.ts";
          else if (fs.existsSync(resolvedPath + "/index.tsx")) resolvedPath += "/index.tsx";
          else return;
        }

        dependencies[file].add(resolvedPath);

        console.log(`🔗 ${file} IMPORTA ${resolvedPath}`);
      }
    });
  });

  return dependencies;
}
