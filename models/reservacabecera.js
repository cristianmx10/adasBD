var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EstadosValidos = {
    values: ['valido', 'anulado', 'cancelado','deuda'],
    message: '{VALUE} no es estado valido'
};
var reservaCabeceraSchema = new Schema({
    fechaEntrada: { type: Date, required: [true, 'La fecha inicio es necesario'] },
    fechaSalida: { type: Date, required: [true, 'La fecha fin es necesario'] },
    habitacion: { type: Schema.Types.ObjectId, ref: 'Habitacion', required: [true, 'El idHabitacion es	un campo obligatorio'] },
    servicio: { type: Schema.Types.ObjectId, ref: 'Servicio' },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    estado: { type: String, required: true, uppercase: true, default: 'valido', enum: EstadosValidos }
});
module.exports = mongoose.model('ReservaCabecera', reservaCabeceraSchema);