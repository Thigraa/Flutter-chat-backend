const express = require('express');
const path = require('path');
require('dotenv').config();

//!DB CONFIG
require('./database/config').dbConnection();


//?App de express
const app = express();

//Lectura y parseo del Body
app.use(express.json());

//! Node Server
const server = require('http'). createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');






//*Path Publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

//Rutas
app.use('/api/login', require('./routes/auth'));


server.listen( process.env.PORT, (error) =>{
    if(error) throw new Error(error);

    console.log(`Servidor corriendo en puerto:`, process.env.PORT);
} ); 