import fs from "fs";
import path from "path";
export function buildDependencyGraph(files) {
    const dependencies = {};
    files.forEach((file) => {
        const content = fs.readFileSync(file, "utf-8");
        const imports = content.match(/import .* from ['"](.*)['"]/g) || [];
        dependencies[file] = new Set();
        imports.forEach((imp) => {
            const match = imp.match(/['"](.*)['"]/);
            if (match) {
                let importedPath = match[1];
                // Ignorar pacotes de node_modules
                if (!importedPath.startsWith("."))
                    return;
                let resolvedPath = path.resolve(path.dirname(file), importedPath);
                // Resolver extensão corretamente
                if (!fs.existsSync(resolvedPath)) {
                    if (fs.existsSync(resolvedPath + ".ts"))
                        resolvedPath += ".ts";
                    else if (fs.existsSync(resolvedPath + ".tsx"))
                        resolvedPath += ".tsx";
                    else if (fs.existsSync(resolvedPath + ".js"))
                        resolvedPath += ".js";
                    else if (fs.existsSync(resolvedPath + "/index.ts"))
                        resolvedPath += "/index.ts";
                    else if (fs.existsSync(resolvedPath + "/index.tsx"))
                        resolvedPath += "/index.tsx";
                    else
                        return; // Se não encontrar, ignora
                }
                dependencies[file].add(resolvedPath);
                // ✅ LOG para depuração
                console.log(`🔗 ${file} IMPORTA ${resolvedPath}`);
            }
        });
    });
    return dependencies;
}
