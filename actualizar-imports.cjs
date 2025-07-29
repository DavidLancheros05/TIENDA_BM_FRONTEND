// actualizar-imports.cjs
const fs = require('fs');
const path = require('path');

// Ruta del proyecto donde están tus archivos
const projectDir = path.resolve('./src');

// Función recursiva para encontrar archivos .tsx
function findFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(findFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Buscar todos los archivos .tsx en el directorio src
const tsxFiles = findFiles(projectDir);

// Reemplazar importaciones de .jsx a .tsx en cada archivo
tsxFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  const newContent = content.replace(/(from\s+['"]\.\/[^'"]+)\.jsx(['"])/g, '$1.tsx$2');

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Actualizado: ${filePath}`);
  }
});

console.log('\n🎉 Importaciones actualizadas de .jsx a .tsx');
