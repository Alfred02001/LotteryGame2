function comprobarNumeros() {
    const numerosSeleccionados = [
        document.getElementById('numero1').value,
        document.getElementById('numero2').value,
        document.getElementById('numero3').value,
        document.getElementById('numero4').value,
        document.getElementById('numero5').value,
        document.getElementById('numero6').value,
    ];

    const resultado = document.getElementById('resultado');

    // Use the selected numbers instead of generating new ones
    const { numeroGanador } = generateNumbers(6, 1, 100);

    let aciertos = 0;
    for (let i = 0; i < numerosSeleccionados.length; i++) {
        if (parseInt(numerosSeleccionados[i]) === numeroGanador) {
            aciertos++;
        }
    }

    if (aciertos === 6) {
        resultado.innerHTML = `Felicidades, Has ganado el premio mayor! Tus numeros fueron: ${numerosSeleccionados.join(', ')}`;
    } else if (aciertos >= 1) {
        resultado.innerHTML = `Felicidades, Has ganado un premio menor! Haz acertado ${aciertos} numeros! Tus numeros fueron: ${numerosSeleccionados.join(', ')}`;
    } else {
        resultado.innerHTML = `Lo siento, no has ganado. El número ganador era: ${numeroGanador}`;
    }
}




/*function generateNumbers(size, lowest,highest){
	const numbers = [];
	const numeroGanador = Math.floor(Math.random() * (highest - lowest + 1)) + lowest;

	for (let i = 0; i < size; i++) {
		numbers.push(Math.floor(Math.random() * (highest - lowest + 1)) + lowest);
	}

	return {
		numbers,
		numeroGanador,
	};

}

function comprobarNumeros() {
	const numerosSeleccionados = [
		document.getElementById('numero1').value,
		document.getElementById('numero2').value,
		document.getElementById('numero3').value,
		document.getElementById('numero4').value,
		document.getElementById('numero5').value,
		document.getElementById('numero6').value,
	];
	const resultado = document.getElementById('resultado');

	const { numbers } = generateNumbers(6, 1, 100);

	let aciertos = 0;
	for (let i = 0; i < numerosSeleccionados.length; i++) {
		if ( numbers.includes(numerosSeleccionados[i])) {
			aciertos++;
		}
	}

	if (aciertos === 6) {
		resultado.innerHTML = `Felicidades, Has ganado el premio mayor! Tus numeros fueron: ${numerosSeleccionados.join(', ')}`;
	} else if (aciertos >= 1) {
		resultado.innerHTML = `Felicidades, Has ganado un premio menor! Haz acertado ${aciertos} numeros! Tus numeros fueron: ${numerosSeleccionados.join(', ')}`;
	} else {
		resultado.innerHTML = `Lo siento, no has ganado. Los numeros ganadores eran: ${numbers.join(', ')}`;
	}
}
*/