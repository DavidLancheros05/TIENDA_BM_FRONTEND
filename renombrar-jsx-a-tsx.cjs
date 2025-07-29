// renombrar-jsx-a-tsx.cjs
const fs = require('fs');
const path = require('path');

const directorio = path.resolve('./src');

function renombrarArchivos(dir) {
  const entradas = fs.readdirSync(dir, { withFileTypes: true });

  for (const entrada of entradas) {
    const rutaCompleta = path.join(dir, entrada.name);

    if (entrada.isDirectory()) {
      renombrarArchivos(rutaCompleta);
    } else if (entrada.isFile() && entrada.name.endsWith('.jsx')) {
      const nuevaRuta = rutaCompleta.replace(/\.jsx$/, '.tsx');
      fs.renameSync(rutaCompleta, nuevaRuta);
      console.log(`✅ Renombrado: ${rutaCompleta} → ${nuevaRuta}`);
    }
  }
}

renombrarArchivos(directorio);
console.log('\n🎉 Todos los archivos .jsx han sido renombrados a .tsx');
