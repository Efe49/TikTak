'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Comentario = require('../model/Comentario');
const router = express.Router();

router.route('/:id')
    .put((req,res)=>{
        const _id = req.params.id;

        Comentario.findOneAndUpdate({_id},req.body,
            {new: true},
            (err,comentario)=>{
                if(err){
                    res.status(404).json(err);
                }
                res.json(comentario);
            });
    });
    module.exports = router;