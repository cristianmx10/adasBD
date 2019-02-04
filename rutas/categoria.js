var express = require('express');

var app = express();
var Categoria = require('../models/categoria');
//LISTAR CATEGORIAS
app.get('/', (req, res) => {
    Categoria.find({}, )
        .exec((err, categoria) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'error al listar categorias',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                categoria
            });
        });
});
//CREAR CATEGORIA
app.post('/', (req, res) => {
    var body = req.body;
    var categoria = new Categoria({
        nombre: body.nombre,
        detalles: body.detalles,
        precio: body.precio
    });
    categoria.save((err, categoriaGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear categoria',
                err
            });
        }
        res.status(201).json({
            ok: true,
            categoriaGuardada
        });
    });
});
//ACTUALIZAR CATEGORIA
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Categoria.findById(id, (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al actualizar categoria',
                err
            });
        }
        if (!categoria) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la categoria con el id: ' + id + ' no existe',
                errors: { message: 'no existe id' }
            });
        }
        categoria.nombre = body.nombre;
        categoria.detalles = body.detalles;
        categoria.precio = body.precio;
        categoria.save((err, categoriaGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar categoria',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                categoriaGuardada
            });
        });

    });
});
//BORRAR CATEGORIA
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar categoria',
                err
            });
        }
        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe la categoria con el id :' + id,
                errors: { message: 'no existe id' }
            });
        }
        res.status(200).json({
            ok: true,
            categoriaBorrada
        });
    });
})
module.exports = app;