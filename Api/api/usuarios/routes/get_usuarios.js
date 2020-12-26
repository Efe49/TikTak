'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.route('/')
    .get((req,res)=>{
        Usuario.find({/*Podemos poner aqui terminos para busquedas especificas como 
        username : 'Pablo'  se deja en vacio para  showAll*/}, (err,usuarios)=>{
            if(err){
                res.status(400).json(err);
            }
           res.json(usuarios); 
        });
    });

    module.exports = router;