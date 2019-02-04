var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var grupoUserSchema = new Schema({

    nombre: { type: String, unique: true, required: [true, 'El nombre de grupo es necesario'], toUpperCase: true },
    detalles: { type: String }

}, { collection: 'grupoUser' });
grupoUserSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('GrupoUser', grupoUserSchema);