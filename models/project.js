'use strict'

// Se importa mongoose
var mongoose = require('mongoose');

// Se importa es Schema de mongoose para crear uno nuevo
var Schema = mongoose.Schema;

//Se crea en Schema primario de la base de datos
var ProjectSchema = Schema({
	name: String,
	description: String,
	category: String,
	year: Number,
	langs: String,
	image: String
});

//Se exporta el modulo y se usa el metodo model() para establecer el Schema creado

/* 

module.exports = 
mongoose.model('NombreQueQueremosParaLaColeccion', SchemaDelProyecto);

*/

//Mongo pone el nombre en minuscula y lo pluraliza, si existe la coleccion lo añade
module.exports = mongoose.model('Project',ProjectSchema);