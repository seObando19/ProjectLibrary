const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const TaskSchema = new Schema({
    id:Number,
    nombre:String,
    autor:String,
    genero:String,    
    codigo:String,
    editorial:String,
    ano:Number,    
});
//guardando en una coleecion el documento
module.exports = mongoose.model('tasks', TaskSchema);