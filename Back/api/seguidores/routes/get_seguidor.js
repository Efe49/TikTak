'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Seguidor = require('../model/Seguidor');
const router = express.Router();

router.route('/:id')
    .get((req,res) => {
        
        const _id = req.params.seguidor;
        

        Seguidor.findOne({_id}, (err,seguidor) => {
            if(err){
                res.status(400).json(err);
            }
            if(!seguidor){
                res.status(404).json({message: 'Seguidor no encontrado.'})
            }
            res.json(seguidor);
        });
    });

    module.exports = router;