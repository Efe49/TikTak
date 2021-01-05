'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Seguidor = require('../model/Seguidor');
const Usuario = mongoose.model('Usuario')
const router = express.Router();

router.route('/')
    .post((req, res) => {
        const seguidor = new Seguidor(req.body);
        const seguidor1 = req.body.seguidor
        const seguido = req.body.seguido


        seguidor.save((err) => {
            if (err) {
                res.status(500).send({ message: `Error al crear el usuario: ${err}` })


            } else {
                Usuario.findOneAndUpdate({ 'userName': seguido }, { $inc: { seguidores: 1 } }, (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(response)
                    }

                })
                Usuario.findOneAndUpdate({ 'userName': seguidor1 }, { $inc: { seguidos: 1 } }, (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(response)
                    }
                })
                return res.json(seguidor);
            }

        })

    });

module.exports = router;