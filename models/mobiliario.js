var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mobiliarioSchema = new Schema({

    nombre: { type: String, unique: true, required: [true, 'El nombre es necesario'] },
    detalles: { type: String }

}, { collection: 'mobiliario' });

module.exports = mongoose.model('Mobiliario', mobiliarioSchema);