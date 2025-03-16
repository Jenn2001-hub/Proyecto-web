const sequelize = require('./config/db');
const app = require('./app');
const dotenv = require('dotenv');
require('.\models/associations');

dotenv.config();

const PORT =process.env.PORT || 3000;


sequelize.authenticate()
    .then(()=> {
        console.log('conectado a PostgreSQL con sequelize');
        app.listen(PORT, ()=>{
            console.log('servidor corriendo en http://localhost:${PORT}');
        
        });
    })
    .chatch(err=> console,error('Error conectado a la base de datos:', err));

sequelize.sync({force: false}).then(()=>{
    console.log('Base de datos sincronzada');
}).catch(err=>{
    console.error('Error al sincronzar la base de datos:', err);
});
