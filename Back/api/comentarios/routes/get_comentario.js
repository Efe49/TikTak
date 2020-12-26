'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Comentario = require('../model/Comentario');
const router = express.Router();

router.route('/:id')
    .get((req,res) => {
        const _id = req.params.id;
        

        Comentario.findOne({_id}, (err,comentario) => {
            if(err){
                res.status(400).json(err);
            }
            if(!comentario){
                res.status(404).json({message: 'Comentario no encontrado.'})
            }
            res.json(comentario);
        });
    });

    module.exports = router;