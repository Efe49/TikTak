'use-strict';
const services = require('../../services')
const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.route('/')
    .get((req,res) => {
        
        const token = req.headers.authorization.split(" ")[1]
     
            services.decodeToken(token)
                .then(response=>{
                    const _id  = response
                    Usuario.findOne({_id}, (err,usuario) => {
                        if(err){
                            res.status(400).json(err)
                        }
                        if(!usuario){
                            res.status(404).json({message: 'Usuario no encontrado.'})
                        }
                        res.json(usuario)
                    });
                 })
                .catch(response=>{
                     res.status(response.status).send({message : response.message})
                })
           
    })
    

    module.exports = router