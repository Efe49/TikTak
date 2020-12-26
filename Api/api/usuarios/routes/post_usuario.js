'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('../model/Usuario');
const router = express.Router();
const service = require('../../services')

router.route('/')
    .post((req, res)=>{
        const userName = req.params.userName;
        const usuarioReq = new Usuario(req.body);
        Usuario.findOne({userName}, (err,usuario) => {
            if(err){
                res.status(400).json(err);
            }else if(usuario){
                res.status(500).json({message: 'UserName ya en uso '})
                
            }else{
            usuarioReq.save((err2)=>{
                if(err2) {
                    res.status(500).send({message: `Error al crear el usuario: ${err2}`})
                }else{
                    return res.status(200).send({token : service.createToken(usuarioReq)})
                }
        
                
            })
        }
           
        
        });
        
            
        
    });

    module.exports = router;