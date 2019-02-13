'use strict'

//Importar modelo del proyecto para poder usarlo

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = 
{
	home: function(req, res)
	{
		return res.status(200).send({
			message: 'Soy la home'
		});
	},

	test: function(req, res)
	{
		return res.status(200).send({
			message: 'Soy el motedo test del controlador de project'
		});
	},

	saveProject: function(req, res)
	{
		//Se instancia el modelo de projecto
		var project = new Project();

		var params = req.body;

		// Seteo de parametros
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.years;
		project.langs = params.langs;
		project.image = params.image;

		/* el metodo save tiene una funcion de callback que deuelve en error
		y una respuesta correcta en caso de realizarse la peticion correctamente */
		
		project.save((err, projectStored) => {

			if(err) return res.status(500).send({message: 'Error al guardar'});
		
			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

			return res.status(200).send({project: projectStored});
		});

											/*
											return res.status(200).send({
												project: project,
												message: 'Metodo saveProject'
											});*/
	},

	getProject: function(req, res){

		var projectId = req.params.id;

		if (projectId == null) return res.status(404).send({message: "El proyecto no existe"});
		
		//findById(idDelProyecto, callBack(error, proyecto){});
		Project.findById(projectId, (err, project) => {

			if (err) return res.status(500).send({message: 'Error al devolver los datos'});

			if (!project) return res.status(404).send({message: "El proyecto no existe"});

			return res.status(200).send(project);
		});
	},

	getProjects: function(req, res){
		//find({parametro: 2018})
		//find({}).exec((error, projecto) => {});
				//Con sort('parametro') ordenamos de viejo a nuevo
				//Con sort('-parametro') ordenamos de nuevo a viejo
		Project.find({}).sort('-year').exec((err, projects) => {

			if (err) return res.status(500).send({message: 'Error al devolver los datos'});

			if (!projects) return res.status(404).send({message: 'No hay proyectos para mostrar'});

			return res.status(200).send({projects});

		});

	},

	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;
								// ID - cuerpo a actualizar - devulver nuevos datos - funcion de callback
		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate) => {
			if (err) return res.status(500).send({message: "Error al actualizar"});

			if (!projectUpdate) return res.status(404).send({message: "Este proyecto no existe"});

			return res.status(200).send({
				project: projectUpdate
			})
		});

	},

	deleteProject: function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndDelete(projectId, (err, projectRemoved) => {
			if (err) return status(500).send({message: "No se ha podido eliminar el documento"});

			if (!projectRemoved) return res.status(404).send({message: "El proyecto no esxiste"});

			return res.status(200).send({
				project: projectRemoved
			});
		})
	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName  = 'Imagen no subida...';



		if (req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
				
				Project.findByIdAndUpdate(projectId, {image:fileName},{new:true}, (err, projectUpdate) => {
					if (err) return res.status(500).send({message: 'Imagen no subida'});

					if (!projectUpdate) return res.status(404).send({message: 'El proyecto no existe'});
			
					return res.status(200).send({
						project: projectUpdate
					});

				});


			} else {
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extension no es valida'});
				});
			}
 		}
 	},

 	getImageFile: function(req, res)
 	{
 		var file = req.params.image;
 		var path_file = './uploads/'+ file;

 		fs.exists(path_file, (exists) => {
 			if (exists == true)
 			{
 				return res.sendFile(path.resolve(path_file));
 			}
 			else
 			{
 				return res.status(200).send({
 					message: 'No existe la imagen...'
 				});
 			}
 		});
 	}


};

module.exports = controller;