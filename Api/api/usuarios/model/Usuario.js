'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema ({
    profilePic: {type: String, required:true},
    password: {type: String, required:true},
    userName: {type: String, required:true},
    name: {type: String, required:true}, 
    email: {type: String, required:true},
    seguidores: {type: Number, required:true},
    seguidos: {type: Number, required:true}
});

module.exports = mongoose.model('Usuario',UsuarioSchema);