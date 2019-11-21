const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    id:Number,
    documento:String,
    nombre:String,
    apellido:String,
    email:String,
    password:String
});
//guardando en una coleecion el documento
module.exports = mongoose.model('usuarios', usuarioSchema);