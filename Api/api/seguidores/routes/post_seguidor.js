'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Seguidor = require('../model/Seguidor');
const router = express.Router();

router.route('/')
    .post((req, res)=>{
        const seguidor = new Seguidor(req.body);

        
            seguidor.save((err)=>{
                if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
        
                return res.json(seguidor);
            })
        
    });

    module.exports = router;