import bcrypt from 'bcryptjs';

const passwordIngresada = '1234';
const hashBD = '$2b$10$4/BabizJO76oVYo8sfGXNeWm9PO2W1Sc8EExEXYDdv77du.c23BgW';

const esValida = await bcrypt.compare(passwordIngresada, hashBD);
console.log('¿La contraseña coincide?', esValida);