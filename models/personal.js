var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var personalSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'el usuario es necesaria'] }
}, { collection: 'Personal' });
module.exports = mongoose.model('UsuarioGrupo', personalSchema);