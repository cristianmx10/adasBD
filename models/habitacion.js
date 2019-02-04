var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EstadosValidos = {
    values: ['OCUPADO', 'LIBRE', 'LIMPIEZA'],
    message: '{VALUE} no es estado valido'
};
var habitacionSchema = new Schema({
    numero: { type: String, unique: true, required: [true, 'El numero de habitacion es necesario'] },
    piso: { type: Number, required: [true, 'El piso es necesario'] },
    estado: { type: String, required: true, uppercase: true, default: 'libre', enum: EstadosValidos },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: [true, 'la categoria es necesaria'] }
}, { collection: 'habitaciones' });
module.exports = mongoose.model('Habitacion', habitacionSchema);