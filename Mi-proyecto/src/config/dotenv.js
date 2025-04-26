//exporta las librerias necesarias
const dotenv = require('dotenv');

//trae las variasbles de env
dotenv.config();

//asigna nombres, usuarios, password etc. 
module.exports = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    JWT_SECRET: process.env.JWT_SECRET
};