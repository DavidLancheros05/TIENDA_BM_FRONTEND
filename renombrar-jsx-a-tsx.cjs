const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src');

function renameJSXtoTSX(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      renameJSXtoTSX(fullPath);
    } else if (item.endsWith('.jsx')) {
      const newPath = fullPath.replace(/\.jsx$/, '.tsx');
      fs.renameSync(fullPath, newPath);
      console.log(`✅ Renombrado: ${fullPath} -> ${newPath}`);
    }
  }
}

renameJSXtoTSX(baseDir);
console.log('\n🎉 Archivos renombrados de .jsx a .tsx');
