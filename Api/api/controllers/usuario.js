'use-strict'

const mongoose = require('mongoose');
const { model } = require('../usuarios/model/Usuario');
const Usuario = require('../usuarios/model/Usuario');
const service = require('../services')

function signUp(req,res){
    const usuario = new Usuario(req.body);

    usuario.save((err)=>{
        if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({token : service.createToken(usuario)})
    })
}
function signIn(req,res){
       Usuario.find({userName : req.body.email,password :req.body.password}, (err,usuario)=>{
           if(err) return res.status(500).send({message: err})
           
           if(!usuario) return res.status(404).send({message: 'No existe el usuario o password incorrecta'})

           req.usuario = usuario
           res.status(200).send({
               message: 'Te has logueado correctamente',
               token : service.createToken(user)
           })
       }) 

}
model.exports={
    signUp,
    signIn
}