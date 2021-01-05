'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.route('/:userName')
    .get((req, res) => {

        const _id = req.params.userName;


        Usuario.findOne({ 'userName': `${_id}` }, (err, usuario) => {
            if (err) {
                res.status(400).json(err);
            } else if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado.' })
            } else {

                res.json(usuario);
            }
        });
    });

module.exports = router;