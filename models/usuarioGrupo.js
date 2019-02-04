var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioGrupoSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'el usuario es necesaria'] },
    grupouser: { type: Schema.Types.ObjectId, ref: 'GrupoUser', required: [true, 'la grupo es necesaria'] }
}, { collection: 'usuarioGrupo' });
module.exports = mongoose.model('UsuarioGrupo', usuarioGrupoSchema);