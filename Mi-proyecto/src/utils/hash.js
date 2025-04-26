const bcrypt = require('bcrypt');

const password = 'jennifer_1234'; // La contraseña que quieres hashear
const saltRounds = 10; // Número de rondas de sal (10 es un valor estándar)

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
    return;
  }
  console.log('Hash generado:', hash);
});

//se creo el script hash.js para hacer las pruebas y poder encriptar los PASSWORD 