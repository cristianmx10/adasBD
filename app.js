//importacion de librerias
var express = require('express');
//mongoose
var mongoose = require('mongoose');


//inicializar variable
var app = express();
//conexion a la base de daros
mongoose.connection.openUri('mongodb://localhost:27017/adasDB', (err, res) => {
    if (err) throw err;
    console.log('base de datos : \x1b[32m%s\x1b[0m', 'online');
});

//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    });
});

//escuchar peticiones
app.listen(3000, () => {
    console.log('express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});