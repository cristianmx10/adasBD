var express = require('express');

var app = express();
var Servicio = require('../models/servicio');
//LISTAR SERVICIO
app.get('/', (req, res) => {
    Servicio.find({}, )
        .exec((err, servicio) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al listar servicios',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                servicio
            });
        });
});
//CREAR SERVCIO
app.post('/', (req, res) => {
    var body = req.body;
    var servicio = new Servicio({
        nombre: body.nombre.toUpperCase(),
        detalles: body.detalles,
        precio: body.precio
    });
    servicio.save((err, servicioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear servicio',
                err
            });
        }
        res.status(201).json({
            ok: true,
            servicioGuardado
        });
    });
});
//ACTUALIZAR SERVICIO
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Servicio.findById(id, (err, servicio) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al actualizar servicio',
                err
            });
        }
        if (!servicio) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el servicio con el id: ' + id + 'no existe',
                errors: { message: 'no existe id' }
            });
        }
        servicio.nombre = body.nombre.toUpperCase();
        servicio.detalles = body.detalles;
        servicio.precio = body.precio;
        servicio.save((err, servicioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar servicio',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                servicioGuardado
            });
        });
    });
});
//BORRAR SERVCIO
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Servicio.findByIdAndRemove(id, (err, servicioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar servicio',
                err
            })
        }
        if (!servicioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un servicio con el id: ' + id,
                errors: { message: 'no existe id' }
            });
        }
        res.status(200).json({
            ok: true,
            servicioBorrado
        });
    })
})
module.exports = app;