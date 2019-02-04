var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var servicioSchema = new Schema({

    precio: { type: Number },
    fechaRegistro: { type: Date, required: [true, 'la fecha de registro es necesario'], default: Date() },
    estado: { type: String, required: [true, 'el estado es necesario'] },
    habitacion: { type: Schema.Types.ObjectId, ref: 'Habitacion', required: [true, 'El idHabitacion es	un campo obligatorio'] },
    reservacabecera: { type: Schema.Types.ObjectId, ref: 'ReservaCabecera', required: [true, 'campo obligatorio'] },
    servicio: { type: Schema.Types.ObjectId, ref: 'Servicio', required: false },

}, { collection: 'ReservaDetalles' });

module.exports = mongoose.model('ReservaDetalles', servicioSchema);