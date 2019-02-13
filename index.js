'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

//Mongoose es una promesa
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
		//then(()=>{callback}) cuando se ejecute la primera instruccion
		.then(()=>{
			console.log('Conexion a la base de datos correcta!');

			//Creacion del servidor
				//Metodo listen de express para iniciarlo variable.listen(puerto, ()=>{callBack});
			app.listen(port, () => {
				console.log('servidor iniciado correctamente en la url: localhost:3700');
			})
		})
		.catch(err => console.log(err));