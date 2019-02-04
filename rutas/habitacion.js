var express = require('express');
var app = express();
var Habitacion = require('../models/habitacion');
//LISTAR HABITACIONES
app.get('/', (req, res) => {
    Habitacion.find({}, )
        .exec((err, habitacion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al listar habitaciones',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                habitacion
            });
        });
});
//CREAR HAITACION
app.post('/', (req, res) => {
    var body = req.body;
    var habitacion = new Habitacion({
        numero: body.numero,
        piso: body.piso,
        estado: body.estado,
        categoria: body.categoria
    });
    habitacion.save((err, habitacionGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear habitacion',
                err
            })
        }
        res.status(201).json({
            ok: true,
            habitacionGuardado
        });
    });
});
//ACTUALIZAR HABITACION
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Habitacion.findById(id, (err, habitacion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al actualizar habitacion',
                err
            })
        }
        if (!habitacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la habitacion el id: ' + id + ' no existe',
                errors: { message: 'no existe id' }
            });
        }
        habitacion.numero = body.numero;
        habitacion.piso = body.piso;
        habitacion.estado = body.estado.toUpperCase();
        habitacion.categoria = body.categoria;
        habitacion.save((err, habitacionGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar habitacion',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                habitacionGuardada
            });
        });
    });
});
//BORRAR HABITACION
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Habitacion.findByIdAndRemove(id, (err, habitacionBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar habitacion',
                err
            });
        }
        if (!habitacionBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe una habitacion con el id: ' + id,
                errros: { message: 'no existe id' }
            })
        }
        res.status(200).json({
            ok: true,
            habitacionBorrada
        });
    });
});
module.exports = app;