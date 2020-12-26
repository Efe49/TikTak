'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.route('/:id')
    .delete((req,res)=>{
        const _id = req.params.id;

        Usuario.findOneAndDelete({ _id }, (err, usuario) =>{
            if(err){
                res.status(400).json(err);
            }
            if(!usuario){
                res.status(404).json({message: 'Usuario no encontrado.'});
            }
            res.json({message:`Usuario ${usuario._id} borrado.`});
        });
    });

    module.exports = router;