'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Comentario = require('../model/Comentario');
const router = express.Router();

router.route('/')
    .post((req, res)=>{
        const comentario = new Comentario(req.body);

        comentario.save((err,comentario)=>{
            if(err){
                res.status(400).json(err);
            }

            res.json(comentario);
        });
    });

    module.exports = router;