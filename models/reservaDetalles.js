var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var servicioSchema = new Schema({

    precio: { type: Number },
    habitacion: { type: Schema.Types.ObjectId, ref: 'Habitacion', required: [true, 'El idHabitacion es	un campo obligatorio'] },
    reservacabecera: { type: Schema.Types.ObjectId, ref: 'ReservaCabecera', required: [true, 'campo obligatorio'] },
    servicio: { type: Schema.Types.ObjectId, ref: 'Servicio', required: false },

});

module.exports = mongoose.model('Servicio', servicioSchema);