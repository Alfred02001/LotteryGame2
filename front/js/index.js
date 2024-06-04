const urlApi = "http://localhost:3000/";
const resource = urlApi + 'user';
var numeroGanador = 0;

const agregarJugador = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
        return; // Exit function if validation fails
    }

//Make one string line with the numbers and resolve the for below this model
    const model = {
        name: document.getElementById('nombre').value,
        numbers: [] // Inicializa como un array vacío
    };

    // Extract numbers from input fields and add them to the model
    for (let i = 1; i <= 6; i++) {
        const number = parseInt(document.getElementById("numero" + i).value);
        model.numbers.push(number);
    }

    model.numbers = Array.from(model.numbers);
    model.numbers = new Array(model.numbers);
    model.numbers = model.numbers.join(', ');

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

    console.log(model);
}

function validarFormulario() {
    
    var nombre = document.getElementById('nombre').value;
    var numero1 = document.getElementById('numero1').value;
    var numero2 = document.getElementById('numero2').value;
    var numero3 = document.getElementById('numero3').value;
    var numero4 = document.getElementById('numero4').value;
    var numero5 = document.getElementById('numero5').value;
    var numero6 = document.getElementById('numero6').value;
    
    
    if (nombre.trim() === '' || numero1.trim() === '' || numero2.trim() === '' || numero3.trim() === '' || numero4.trim() === '' || numero5.trim() === '' || numero6.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return false; // Prevent form submission
    } else {
        return true; // Allow form submission
    }
}

const getData = () => {
    fetch(resource)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verifica que los datos se recibieron correctamente
            const html = data.reduce((acc, player) => {
                const numbers = player.numbers.split(', ');
                const numbersHtml = numbers.map(number => `<td>${number}</td>`).join('');
                return acc += `
                    <tr>
                        <td>${player.name}</td>
                        ${numbersHtml}
                        <td>
                            <button onclick="eliminarJugador(${player.id})">Eliminar</button>
                            <button onclick="editarJugador(${player.id}, '${player.name}', '${player.numbers}')">Editar</button>
                        </td>
                    </tr>`; //`<tr><td>${player.name}</td>${numbersHtml}</tr>`
                
            }, '');
            document.getElementById("lista-jugadores").innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

const eliminarJugador = (id) => {
    fetch(`${resource}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(() => {
        getData(); // Actualiza la tabla después de eliminar el jugador
    }).catch(error => {
        console.error('Error deleting data:', error);
    });
}

const editarJugador = (id, name, numbers) => {
    document.getElementById('nombre').value = name;
    const nums = numbers.split(', ');

    for (let i = 1; i <= 6; i++) {
        document.getElementById('numero' + i).value = nums[i - 1];
    }

    // Cambiar el botón de agregar para que sea un botón de actualizar
    const submitButton = document.querySelector("button[type='submit']");
    submitButton.innerText = "Actualizar";
    submitButton.onclick = (e) => {
        e.preventDefault();
        actualizarJugador(id);
    };
}

const actualizarJugador = (id) => {
    const model = {
        name: document.getElementById('nombre').value,
        numbers: [
            document.getElementById('numero1').value,
            document.getElementById('numero2').value,
            document.getElementById('numero3').value,
            document.getElementById('numero4').value,
            document.getElementById('numero5').value,
            document.getElementById('numero6').value
        ].join(', ')
    };

    fetch(`${resource}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    }).then(() => {
        // Cambiar el botón de actualizar para que sea un botón de agregar nuevamente
        const submitButton = document.querySelector("button[type='submit']");
        submitButton.innerText = "Agregar";
        submitButton.onclick = (e) => agregarJugador(e);

        // Limpiar los campos del formulario
        document.getElementById('nombre').value = '';
        for (let i = 1; i <= 6; i++) {
            document.getElementById('numero' + i).value = '';
        }

        // Actualiza la tabla después de actualizar el jugador
        getData();
    }).catch(error => {
        console.error('Error updating data:', error);
    });
}

// Llama a getData() para llenar la tabla al cargar la página
getData();

/*const getData = () => {

    fetch(resource).then(res=>res.json()).then(res=>{
        console.log(res);
    }).then(data=>{
        if(!Array.isArray(data)) {
            console.error('Los datos recibidos no son array:', data);
            return;
        }

        const html = data.reduce((acc, player) => {
            const numbersHtml = player.numbers.map(number => `<td>${number}</td>`).join('');
            return acc += `<tr><td>${player.name}</td>${numbersHtml}</tr>`;
        }, '');
        document.getElementById("lista-jugadores").innerHTML = html;
    });
    try {
            
    } catch (error) {
            
    }((error) => {
        console.error('Error al obtener los datos:',error);
    });
}

getData();*/

const generarNumero = ()=>{
    const generaRandom = () => parseInt(Math.random() * 100);
    return `${generaRandom()} ${generaRandom()} ${generaRandom()} ${generaRandom()} ${generaRandom()} ${generaRandom()}`;
}

const jugar = ()=>{
    alert('¡Comienza el juego!');
    numeroGanador = generarNumero();
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
