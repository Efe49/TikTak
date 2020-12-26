'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Seguidor = require('../model/Seguidor');
const router = express.Router();

router.route('/:id')
    .delete((req,res)=>{
        const _id = req.params.id;

        Seguidor.findOneAndDelete({ _id }, (err, seguidor) =>{
            if(err){
                res.status(400).json(err);
            }
            if(!seguidor){
                res.status(404).json({message: 'Seguidor no encontrado.'});
            }
            res.json({message:`Seguidor ${seguidor._id} borrado.`});
        });
    });

    module.exports = router;