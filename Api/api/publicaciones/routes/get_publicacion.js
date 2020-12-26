'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Publicacion = require('../model/Publicacion');
const router = express.Router();

router.route('/:id')
    .get((req,res) => {
        const _id = req.params.id;
        

        Publicacion.findOne({_id}, (err,publicacion) => {
            if(err){
                res.status(400).json(err);
            }
            if(!publicacion){
                res.status(404).json({message: 'Publicacion no encontrada.'})
            }
            res.json(publicacion);
        });
    });

    module.exports = router;