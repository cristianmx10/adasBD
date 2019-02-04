var express = require('express');
var app = express();
var ReservaCabecera = require('../models/reservacabecera');
//CREEAR RESERVA
app.post('/', (req, res) => {
    var body = req.body;
    var reservaCabecera = new ReservaCabecera({
        fechaEntrada: body.fechaEntrada,
        fechaSalida: body.fechaSalida,
        estado: body.estado,
        habitacion: body.habitacion,
        servicio: body.servicio,
        usuario: body.usuario
    });

    reservaCabecera.save((err, reservaCreada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear reserva',
                err
            });
        }
        res.status(200).json({
            ok: true,
            reservaCreada
        });
    });
});
module.exports = app;