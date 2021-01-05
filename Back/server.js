'use-strict';
const hostname = 'localhost';
const port = 3001;
global.serverDir = `http://${hostname}:${port}`
global.__basedir = __dirname;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
const mongodbUri = 'mongodb://localhost:27017/TikTakDB';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

mongoose.set('useFindAndModify', false);
let contactos = require('./datos');


app.use(cors());

app.use('/public/uploads', express.static('public'));
const isAuth = require('./api/middlewares/auth')
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/Seguidores', require('./api/Seguidores/routes/post_seguidor'));
app.use('/api/Seguidores', require('./api/Seguidores/routes/get_seguidores'));
app.use('/api/Seguidores', require('./api/Seguidores/routes/delete_seguidor'));
app.use('/api/Usuario', require('./api/Usuarios/routes/post_login'));
app.use('/api/Usuarios', require('./api/Usuarios/routes/post_usuario'));
app.use('/api/Usuarios', require('./api/Usuarios/routes/get_usuario'));
app.use('/api/Usuarios', require('./api/Usuarios/routes/get_usuarios'));
app.use('/api/Publicaciones', require('./api/Publicaciones/routes/get_publicaciones'));
app.use('/api/Publicaciones', require('./api/Publicaciones/routes/get_publicacion'));
app.use('/api/Comentarios', require('./api/Comentarios/routes/get_comentarios'));
app.use('/api/UserPic', isAuth, require('./api/Usuarios/routes/post_profilePic'));
app.use('/api/Usuario', isAuth, require('./api/Usuarios/routes/get_usuarioLogged'));
app.use('/api/Usuarios', isAuth, require('./api/Usuarios/routes/delete_usuario'));
app.use('/api/Usuarios', isAuth, require('./api/Usuarios/routes/put_usuario'));
app.use('/api/Publicaciones', isAuth, require('./api/Publicaciones/routes/put_publicacion'));
app.use('/api/Publicaciones', isAuth, require('./api/Publicaciones/routes/post_publicacion'));
app.use('/api/Publicaciones', isAuth, require('./api/Publicaciones/routes/delete_publicacion'));
app.use('/api/Comentarios', isAuth, require('./api/Comentarios/routes/put_comentario'));
app.use('/api/Comentarios', isAuth, require('./api/Comentarios/routes/post_comentario'));
app.use('/api/Comentarios', isAuth, require('./api/Comentarios/routes/delete_comentario'));







app.listen(port, hostname, () => {
    mongoose.connect(mongooseUri, dbOptions, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Server is running at ${serverDir}`);
    });
});