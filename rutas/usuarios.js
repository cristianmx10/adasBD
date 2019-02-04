var express = require('express');
var bcryptjs = require('bcryptjs');
var app = express();


//modelo de usuario
var Usuario = require('../models/usuario')

//LISTAR USUARIOS
app.get('/', (req, res, next) => {
    Usuario.find({}, )
        .exec(
            (err, usuario) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargando usuarios',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuario
                });
            });
});

//CREAR USUARIO
app.post('/', (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        dni: body.dni,
        nombre: body.nombre,
        apellidos: body.apellidos,
        fechaNac: body.fechaNac,
        telefono: body.telefono,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        img: body.img
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear usuarios',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });
});

//ACTUALIZAR USUARIO
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuarios',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id: ' + id + ' no existe',
                errors: { message: 'no existe un usuraio con ese id' }
            });
        }

        usuario.dni = body.dni;
        usuario.nombre = body.nombre;
        usuario.apellidos = body.apellidos;
        usuario.fechaNac = body.fechaNac;
        usuario.telefono = body.telefono;
        usuario.email = body.email;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar usuario usuarios',
                    err
                });
            }
            usuarioGuardado.password = 'xd'
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});
//BORRAR USUARIO
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar usuario usuarios',
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un usuario con con el id: ' + id,
                errors: { message: 'no existe un usuario con ese id' }
            });
        }
        res.status(200).json({
            ok: true,
            usuarioBorrado
        });
    });
});
module.exports = app;