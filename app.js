//importacion de librerias
var express = require('express');
var bodyParser = require('body-parser');
//mongoose
var mongoose = require('mongoose');


//inicializar variable
var app = express();

//CORDS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
//body-parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//importar rutas
var appRoutes = require('./rutas/app');
var usuarioRoutes = require('./rutas/usuarios');
var grupoRoutes = require('./rutas/grupoUser');
var categoriaRoutes = require('./rutas/categoria');
var servicioRoutes = require('./rutas/servicio');
var habitacionRoutes = require('./rutas/habitacion');
var reservaDetallesRoutes = require('./rutas/reservaDetalles');
var reservaCabeceraRoutes = require('./rutas/reservaCabecera');


//conexion a la base de daros
mongoose.connection.openUri('mongodb://localhost:27017/adasDB', (err, res) => {
    if (err) throw err;
    console.log('base de datos : \x1b[32m%s\x1b[0m', 'online');
});

//rutas
app.use('/usuario', usuarioRoutes);
app.use('/reservar', reservaCabeceraRoutes);
app.use('/reserva', reservaDetallesRoutes);
app.use('/habitacion', habitacionRoutes);
app.use('/servicio', servicioRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/grupo', grupoRoutes);
app.use('/', appRoutes);

//escuchar peticiones
app.listen(3000, () => {
    console.log('express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});