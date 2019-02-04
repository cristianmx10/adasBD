var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var clienteSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'el usuario es necesaria'] }
}, { collection: 'Cliente' });
module.exports = mongoose.model('UsuarioGrupo', clienteSchema);