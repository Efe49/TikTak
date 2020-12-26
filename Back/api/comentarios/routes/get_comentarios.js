'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Comentario = require('../model/Comentario');
const router = express.Router();

router.route('/:publicacion')
    .get((req,res)=>{
        Comentario.find({publicacion : req.params.publicacion}, (err,comentarios)=>{
            if(err){
                res.status(400).json(err);
            }else{
                res.json(comentarios); 
            }
           
        });
    });

    module.exports = router;