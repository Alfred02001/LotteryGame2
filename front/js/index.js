const urlApi = "http://localhost:3000/";
const resource = urlApi + 'user';
var numeroGanador = 0;

const agregarJugador = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
        return; // Exit function if validation fails
    }

    const model = {
        name: document.getElementById('nombre').value,
        numbers: []
    };

    // Extract numbers from input fields and add them to the model
    for (let i = 1; i <= 6; i++) {
        const number = document.getElementById("numero" + i).value;
        model.numbers.push(number);
    }

    fetch(resource, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    }).then(() => {
        getData();
    });
}

function validarFormulario() {
    console.log("Validating form...");

    var nombre = document.getElementById('nombre').value;
    var numero1 = document.getElementById('numero1').value;
    var numero2 = document.getElementById('numero2').value;
    var numero3 = document.getElementById('numero3').value;
    var numero4 = document.getElementById('numero4').value;
    var numero5 = document.getElementById('numero5').value;
    var numero6 = document.getElementById('numero6').value;
    
    
    if (nombre.trim() === '' || numero1.trim() === '' || numero2.trim() === '' || numero3.trim() === '' || numero4.trim() === '' || numero5.trim() === '' || numero6.trim() === '') {
        //document.getElementById('mensajeError').innerText = 'Por favor, complete todos los campos.';
        alert('Por favor, complete todos los campos.');
        return false; // Prevent form submission
    } else {
        //document.getElementById('mensajeError').innerText = '';
        return true; // Allow form submission
    }
}

const getData = () => {
    fetch(resource)
        .then((res) => res.json())
        .then((data) => {
            const html = data.reduce((acc, player) => {
                const numbersHtml = player.numbers.map(number => `<td>${number}</td>`).join('');
                return acc += `<tr><td>${player.name}</td>${numbersHtml}</tr>`;
            }, '');
            document.getElementById("lista-jugadores").innerHTML = html;
        });
}

getData();

const genearNumero = ()=>{
    const generaRandom = () => parseInt(Math.random() * 100);
    return `${generaRandom()} ${generaRandom()} ${generaRandom()} ${generaRandom()} ${generaRandom()} ${generaRandom()}`;
}

const jugar = ()=>{
    numeroGanador = genearNumero();
    document.getElementById("numeroGanador").innerHTML = numeroGanador;
    const trs = [...document.querySelectorAll("tbody tr")];
    trs.forEach(x=>{
        var tds = x.childNodes;
        var arrTds = [tds[1].innerHTML, tds[2].innerHTML, tds[3].innerHTML, tds[4].innerHTML, tds[5].innerHTML, tds[6].innerHTML].join('');
        if(arrTds == numeroGanador) x.style.backgroundColor = "green";
        else x.style.backgroundColor = "red";
    });
}

(function(){
    document.getElementById("numeroGanador").innerHTML = numeroGanador;
})();
