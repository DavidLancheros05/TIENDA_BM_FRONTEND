const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

function actualizarImports(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      actualizarImports(fullPath);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const updated = content.replace(/(from\s+['"][^'"]+)\.jsx(['"])/g, '$1.tsx$2');

      if (content !== updated) {
        fs.writeFileSync(fullPath, updated, 'utf-8');
        console.log(`🔁 Imports actualizados en: ${fullPath}`);
      }
    }
  }
}

actualizarImports(baseDir);
console.log('\n✅ Todos los imports `.jsx` fueron reemplazados por `.tsx`');
