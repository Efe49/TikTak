'use-strict';
const uploadFile = require("../../middlewares/uploadFiles");
const services = require('../../services')
const mongoose = require('mongoose');

const express = require('express');
const Publicacion = require('../model/Publicacion');
const router = express.Router();
const path = `${serverDir}/public/uploads/`

router.route('/')
  .post((req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    services.decodeToken(token)
      .then(response => {
        const _id = req._id;
        Publicacion.findOne({ _id }, async (err, publicacion) => {
          if (err) {
            res.status(400).json(err);
          }

          try {
            await uploadFile(req, res);

            if (req.file == undefined) {
              res.status(400).send({ message: "Please upload a file!" });
            }
            Publicacion.findOneAndUpdate({ _id }, { contenido: `${path}${req.file.originalname}` }, { new: true }, (er, publi) => {
              if (err) {
                res.status(404).json(er);
              } else {
                return res.status(200).send({
                  message: `${path}${req.file.originalname}`,
                });
              }
            })

          } catch (err) {
            res.status(500).send({
              message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            });
          }

        });
      })
      .catch(response => {
        res.status(response.status).send({ message: response.message });
      });

  });
module.exports = router;