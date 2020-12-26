'use-strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeguidorSchema = new Schema ({
    seguidor: {type: String, required: true},
    seguido: {type: String, required:true},
   
});

module.exports = mongoose.model('Seguidores',SeguidorSchema);