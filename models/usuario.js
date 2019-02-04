var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({

    dni: { type: String, unique: true, required: [true, 'El DNI es necesario'] },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos: { type: String, required: [true, 'El apellido es necesario'] },
    fechaNac: { type: Date, required: [true, 'La fecha ed nac. es necesario'] },
    telefono: { type: String },
    fechaRegistro: { type: Date, required: [true, 'La fecha registro es necesario'], default: Date() },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesario'] },
    img: { type: String, required: false },
    google: { type: Boolean, default: false }

});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema)