'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema ({
    id: {type: String /*Cambiar mais tarde o tipo de id ou crear xerador de ids */, required: true},
    creador: {type: String, required:true},
    contenido: {type: String, required:true},
    publicacion: {type: String, required:true}

});

module.exports = mongoose.model('Comentarios',ComentarioSchema);