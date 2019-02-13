'use strict'

var express = require('express');

// Incluimos el controlador creado para project
var ProjectController = require('../controllers/project');

///Cargamos el servicion de rutas de express
var router = express.Router();


//Middleware de connect-multiparty

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'})


//Creamos las rutas indicando la ruta y su funcion de callback
	//En este caso las funciones se encuentran en el objeto ProjectController
router.get('/home', ProjectController.home);

router.post('/test', ProjectController.test);
router.post('/saveProject', ProjectController.saveProject);
router.get('/project/:id', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/uploadImage/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);


//Exportamos el configurador de rutas
module.exports = router;