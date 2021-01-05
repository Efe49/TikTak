'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Seguidor = require('../model/Seguidor');
const Usuario = mongoose.model('Usuario')
const router = express.Router();

router.route('/:id')
    .delete((req, res) => {
        const seguidor1 = req.params.id;
        const seguido = req.body.seguido

        Seguidor.findOneAndDelete({ 'seguidor': seguidor1, 'seguido': seguido }, (err, seguidor) => {
            if (err) {
                res.status(400).json(err);
            } else if (!seguidor) {
                res.status(404).json({ message: 'Seguidor no encontrado.' });
            } else {

                Usuario.findOneAndUpdate({ 'userName': seguido }, { $inc: { seguidores: -1 } }, (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(response)
                    }
                })
                Usuario.findOneAndUpdate({ 'userName': seguidor1 }, { $inc: { seguidos: -1 } }, (err, response) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(response)
                    }
                })
                res.json({ message: `Seguidor ${seguidor} borrado.` });
            }

        });
    });

module.exports = router;