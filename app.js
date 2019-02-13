/* Tipos de peticiones
GET -> para hacer consultas
POST -> para guardar datos en la API
PUT -> actualizar datos
DELETE -> eliminar datos del backend
*/


'use strict'

// Se "requieren" los modulos de express y body parser
var express = require('express');
var bodyParser = require('body-parser');

// Se establece express a una variable
var app = express();

// Cargar archivos de rutas //
var project_routes = require('./routes/project');

// Middleware (Metodo que se ejecuta ANTES del que se ejecute la
// funcionalidad principal de la ruta)


//app es el objeto de express y use es un metodo suyo para crear el middleware
app.use(bodyParser.urlencoded({extended:false})); //esta linea es necesaria concretamente para body parses
app.use(bodyParser.json());

// CORS //

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas //
app.use('/api', project_routes); //Asi creamos una prefijo para las rutas que queramos

					/*  -----EJEMPLO ANTERIOR-----
					// con "/:parametro" se puede añadir un parametro obligatorio a una rutas
						// con "/:parametro?" se puede añadir un parametro opcional a una rutas
							// app.get('/:id?', (req, res) => {}

					//Metodo get() para "mandar la ruta" //
					//Metodo get() de express  -  variable.get('/ruta', (peticion, respuesta) => {logica})
					app.get('/', (req, res) => {
						console.log(req.body.nombre);
						res.status(200).send({ // Estatus 200(espuesta existosa)
							message: "Pagina de inicio de mi API"
						});
					});

					app.get('/test', (req, res) => {
						res.status(200).send({ // Estatus 200(espuesta existosa)
							message: "Hola Mundo desde mi API de nodeJS"
						});
					});
					*/

// Exportar el modulo //
module.exports = app;
