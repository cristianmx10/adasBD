var express = require('express');
var app = express();

var GrupoUser = require('../models/grupoUser');

//LISTAR GRUPOS
app.get('/', (err, res) => {
    GrupoUser.find({})
        .exec(
            (err, grupo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error al listar grupos',
                        err
                    });
                }
                res.status(200).json({
                    ok: true,
                    grupo
                });
            }
        )

});
//CREAR GRUPO
app.post('/', (req, res) => {
    var body = req.body;
    var grupo = new GrupoUser({
        nombre: body.nombre.toUpperCase(),
        detalles: body.detalles
    });
    grupo.save((err, grupoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al guardar grupo',
                err
            });
        }
        res.status(201).json({
            ok: true,
            grupoGuardado
        });
    });
});
//ACTUALIZAR GRUPO
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    GrupoUser.findById(id, (err, grupo) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al actualizar grupo',
                err
            });
        }
        if (!grupo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el grupo con el id: ' + id + ' no existe',
                errors: { message: 'no existe id' }
            });
        }
        grupo.nombre = body.nombre.toUpperCase();
        grupo.detalles = body.detalles;

        grupo.save((err, grupoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar grupo',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                grupoGuardado
            });
        });
    });
});
//BORRAR GRUPO
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    GrupoUser.findByIdAndRemove(id, (err, grupoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar grupo',
                err
            });
        }
        if (!grupoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un grupo con el id: ' + id,
                errors: { message: 'no existe id' }
            });

        }
        res.status(200).json({
            ok: true,
            grupoBorrado
        });
    });
});

module.exports = app;