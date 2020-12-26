'use-strict';
const services = require('../../services')
const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.route('/')
    .post((req,res) => {
        
        Usuario.findOne({userName : req.body.userName}, (err,usuario)=>{
            if(err) return res.status(500).send({message: err})
            
            if(!usuario) return res.status(404).send({message: 'No existe el usuario'})
            if(usuario.password != req.body.password) return res.status(404).send({message: 'Password incorrecta'})
            req.usuario = usuario
            res.status(200).send({
                message: 'Te has logueado correctamente',
                token : services.createToken(usuario)
            })
        }) 
           
    })
    

    module.exports = router