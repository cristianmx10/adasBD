var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categoriaSchema = new Schema({

    nombre: { type: String, unique: true, required: [true, 'El nombre es necesario'] },
    detalles: { type: String },
    precio: { type: Number, required: [true, 'el precio es necesario'] }

}, { collection: 'categorias' });

module.exports = mongoose.model('Categoria', categoriaSchema);