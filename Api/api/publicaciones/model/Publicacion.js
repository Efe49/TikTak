'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionSchema = new Schema ({
    id: {type: String /*Cambiar mais tarde o tipo de id ou crear xerador de ids */, required: false},
    contenido: {type: String, required:false},
    titulo: {type: String, required:true},
    Descripcion: {type: String, required:true}, 
    meGusta: {type: Number, required:false},
    noMeGusta: {type: Number, required:false},
    creador: {type: String, required:false}
});

module.exports = mongoose.model('Publicaciones',PublicacionSchema);