'use strict'

var params = process.argv.slice(2);

var numeroUno = parseFloat(params[0]);
var numeroDos = parseFloat(params[1]);

console.log(params);

console.log(numeroUno);

console.log(numeroDos);

var plantilla = `
	La suma es: ${numeroUno + numeroDos},
	La resta es: ${numeroUno - numeroDos},
	La multiplicacion es: ${numeroUno * numeroDos},
	La division es: ${numeroUno / numeroDos}
`;

console.log(plantilla);