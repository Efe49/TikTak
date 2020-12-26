<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">TikTak</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> TikTak  (ReactJS, NodeJs && MongoDB) 
Aplicacion web para replicar el funcionamiento de TikTok
    <br> 
</p>

## 📝 Tabla de contenidos

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Desarrollo de una App web que sigue una estructura SPA usando ReactJS, junto a su correspondiente back-end, en este caso una API REST con NodeJS, express y la correspondiente BD en MongoDB

## 🏁 Getting Started <a name = "getting_started"></a>

<!-- These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system. -->

### Prerequisites

Para la ejecucion de la aplicacion es necesaria la instalacion de [NodeJs](https://nodejs.org/en/) tanto para el deployment del front como para el del back

Tambien es necesaria la instalacion o el uso en la nube de una base de datos en [MongoDB](https://www.mongodb.com/), en caso de usar una direccion distinta a la que trae por defecto al lanzar la BD, sera necesario cambiar el valor de "mongodbUri" en el archivo Back/server.js a la uri que vayas a usar

<!--
What things you need to install the software and how to install them.

```
Give examples
``` -->

### Installing

<!-- A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo. -->

## 🔧 Running the tests <a name = "tests"></a>

<!-- Explain how to run the automated tests for this system.
 -->

### Break down into end to end tests

<!-- Explain what these tests test and why

```
Give an example
``` -->

### And coding style tests

<!-- Explain what these tests test and why

```
Give an example
``` -->

## 🎈 Usage <a name="usage"></a>

<!-- Add notes about how to use the system. -->

## 🚀 Deployment <a name = "deployment"></a>

Para lanzar la app lo unico que necesitariamos hacer seria
hacer un npm install tanto en la carpeta Back como en la carpeta Front para conseguir las dependencias correspondientes.

Despues lanzamos un

# npm start

o

# npm run

o

# npm run-dev

tanto en la carpeta Front para lanzar el frontend como en la carpeta back para lanzar el backend.
(Es posible hacer un deployment por separado haciendo un mock de las respuestas del back en el caso del front
y con PostMan o app similar en el caso del Back para no necesitar de dos servers levantados al mismo tiempo)

Para el back tambien es necesaria la union a la BD de MongoDB, en caso de que sea online bastaria con modificar la URI como mencionamos arriba, y en caso de que se monte en local es necesario el lanzamiento de mongod.exe tras su correcta configuracion [Documentacion](https://docs.mongodb.com/)

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Base de datos
- [Express](https://expressjs.com/) - Framework para el servidor
- [ReactJS](https://es.reactjs.org/) - Libreria de JS
- [NodeJs](https://nodejs.org/en/) - Entorno de servidor

## ✍️ Authors <a name = "authors"></a>

- [@Efe49](https://github.com/Efe49) - Idea & Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

<!-- - Hat tip to anyone whose code was used
- Inspiration
- References -->
