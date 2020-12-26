'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.route('/:id')
    .put((req,res)=>{
        const _id = req.params.id;

        Usuario.findOneAndUpdate({_id},req.body,
            {new: true},
            (err,usuario)=>{
                if(err){
                    res.status(404).json(err);
                }
                res.json(usuario);
            });
    });
    module.exports = router;