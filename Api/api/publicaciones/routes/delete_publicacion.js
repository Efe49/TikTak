'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Publicacion = require('../model/Publicacion');
const router = express.Router();

router.route('/:id')
    .delete((req,res)=>{
        const _id = req.params.id;

        Publicacion.findOneAndDelete({ _id }, (err, publicacion) =>{
            if(err){
                res.status(400).json(err);
            }
            if(!publicacion){
                res.status(404).json({message: 'Publicacion no encontrada.'});
            }
            res.json({message:`Publicacion ${publicacion._id} borrada.`});
        });
    });

    module.exports = router;