'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Publicacion = require('../model/Publicacion');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        Publicacion.find({}).sort({ _id: -1 }).exec(function (err, publicaciones) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.json(publicaciones);
            }

        });
    });

module.exports = router;