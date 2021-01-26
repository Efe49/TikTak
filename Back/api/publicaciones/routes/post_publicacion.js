'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const Publicacion = require('../model/Publicacion');
const router = express.Router();
const uploadFile = require("../../middlewares/uploadFiles");
const path = `${serverDir}/public/uploads/`
router.route('/')
    .post((req, res) => {
        const publicacion = new Publicacion(req.body);

        publicacion.save((err, publicacion) => {
            if (err) {
                res.status(400).json(err);
            } else {

                res.json(publicacion);
            }


        });


    });

module.exports = router;