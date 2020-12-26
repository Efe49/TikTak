'use-strict';


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
const mongodbUri ='mongodb://localhost:27017/TikTakDB';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

let contactos = require('./datos');



app.use(cors());
const isAuth = require('./api/middlewares/auth')
app.use(bodyParser.urlencoded({ extended : true }));


app.use('/api/Seguidores',require('./api/Seguidores/routes/post_seguidor'));
app.use('/api/Seguidores',require('./api/Seguidores/routes/get_seguidores'));
app.use('/api/Seguidores',require('./api/Seguidores/routes/delete_seguidor'));
app.use('/api/Usuario',require('./api/Usuarios/routes/post_login'));
app.use('/api/Usuario',isAuth,require('./api/Usuarios/routes/get_usuarioLogged'));
app.use('/api/Usuarios',require('./api/Usuarios/routes/post_usuario'));
app.use('/api/Usuarios',require('./api/Usuarios/routes/get_usuarios'));
app.use('/api/Usuarios',require('./api/Usuarios/routes/get_usuario'));
app.use('/api/Usuarios',isAuth,require('./api/Usuarios/routes/delete_usuario'));
app.use('/api/Usuarios',isAuth,require('./api/Usuarios/routes/put_usuario'));
app.use('/api/Publicaciones',require('./api/Publicaciones/routes/get_publicaciones'));
app.use('/api/Publicaciones',require('./api/Publicaciones/routes/get_publicacion'));
app.use('/api/Publicaciones',isAuth,require('./api/Publicaciones/routes/put_publicacion'));
app.use('/api/Publicaciones',isAuth,require('./api/Publicaciones/routes/post_publicacion'));
app.use('/api/Publicaciones',isAuth,require('./api/Publicaciones/routes/delete_publicacion'));
app.use('/api/Comentarios',require('./api/Comentarios/routes/get_comentarios'));
app.use('/api/Comentarios',isAuth,require('./api/Comentarios/routes/put_comentario'));
app.use('/api/Comentarios',isAuth,require('./api/Comentarios/routes/post_comentario'));
app.use('/api/Comentarios',isAuth,require('./api/Comentarios/routes/delete_comentario'));

/*
app.get('/api/contactos',(request, response)=>{
    if(!contactos){
        response.status(400).json({mensaje : "No se han encontrado contactos"});
    }
    response.json(contactos);
});

app.get('/api/contactos/:id', (request,response)=>{
const requestId = request.params.id;
let contacto = contactos.filter(contacto=>{
    return contacto.id == requestId;
});
response.json(contacto[0]);
});

app.post('/api/contactos',(request, response)=>{
    const contacto = {
        id: contactos.length+1,
        picture: request.body.picture,
        age: request.body.age,
        name: request.body.name,
        company: request.body.company,
        email: request.body.email,
        phone: request.body.phone
    }

    contactos.push(contacto);
    response.json(contacto);
});

app.put('/api/contactos/:id',(request,response)=>{
    const requestId = request.params.id;
    let contacto = contactos.filter(contacto=>{
        return contacto.id == requestId;
    })[0];
    const index = contactos.indexOf(contacto); 
    const keys = Object.keys(request.body);

    keys.forEach(key => {
        contacto[key]= request.body[key];
    });
    contactos[index] = contacto;
    response.json(contactos[index]);
})

app.delete('/api/contactos/:id', (request,response) =>{
    const requestId = request.params.id;
    let contacto = contactos.filter(contacto=>{
        return contacto.id == requestId;
    })[0];
    const index = contactos.indexOf(contacto);
    contactos.splice(index,1);

    response.json({mensaje : `Usuario ${requestId} ha sido borrado`});
})
*/
const hostname = 'localhost';
const port = 3001;




app.listen(port,hostname,()=>{
    mongoose.connect(mongooseUri,dbOptions, (err) =>{
        if(err){
            console.log(err);
        }
        console.log(`Server is running at http://${hostname}:${port}`);
    });
});