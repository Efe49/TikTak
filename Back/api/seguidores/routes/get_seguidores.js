'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Seguidor = require('../model/Seguidor');
const router = express.Router();

router.route('/:seguidor')
    .get((req,res)=>{
        const seguid = req.params.seguidor;
        Seguidor.find({seguidor : seguid}, (err,seguidores)=>{
            if(err){
                res.status(400).json(err);
            }else{

                res.json(seguidores); 
            }
        });
    });

    module.exports = router;