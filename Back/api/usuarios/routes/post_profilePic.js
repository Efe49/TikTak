'use-strict';
const uploadFile = require("../../middlewares/uploadFiles");
const services = require('../../services')
const mongoose = require('mongoose');

const express = require('express');
const Usuario = require('../model/Usuario');
const router = express.Router();
const path = `${serverDir}/public/uploads/`

router.route('/')
  .post((req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    services.decodeToken(token)
      .then(response => {
        const _id = response;
        Usuario.findOne({ _id }, async (err, usuario) => {
          if (err) {
            res.status(400).json(err);
          }
          if (!usuario) {
            res.status(404).json({ message: 'Usuario no encontrado.' });
          } else {
            try {
              await uploadFile(req, res);

              if (req.file == undefined) {
                res.status(400).send({ message: "Please upload a file!" });
              }
              Usuario.findOneAndUpdate({ _id }, { profilePic: { path } + req.file.originalname }, { new: true }, (er, usuari) => {
                if (err) {
                  res.status(404).json(er);
                } else {
                  res.status(200).send({
                    message: `Profile pic updated succesfully: ${path}${req.file.originalname}`,
                  });
                }
              })

            } catch (err) {
              res.status(500).send({
                message: `Could not upload the file: ${req.file.originalname}. ${err}`,
              });
            }
          }
        });
      })
      .catch(response => {
        res.status(response.status).send({ message: response.message });
      });

  });
module.exports = router;