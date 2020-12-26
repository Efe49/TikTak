'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Publicacion = require('../model/Publicacion');
const router = express.Router();

router.route('/:id')
    .put((req,res)=>{
        const _id = req.params.id;

        Publicacion.findOneAndUpdate({_id},req.body,
            {new: true},
            (err,publicacion)=>{
                if(err){
                    res.status(404).json(err);
                }
                res.json(publicacion);
            });
    });
    module.exports = router;