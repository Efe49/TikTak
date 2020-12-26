'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Comentario = require('../model/Comentario');
const router = express.Router();

router.route('/:id')
    .delete((req,res)=>{
        const _id = req.params.id;

        Comentario.findOneAndDelete({ _id }, (err, comentario) =>{
            if(err){
                res.status(400).json(err);
            }
            if(!comentario){
                res.status(404).json({message: 'Comentario no encontrado.'});
            }
            res.json({message:`Comentario ${comentario._id} borrado.`});
        });
    });

    module.exports = router;