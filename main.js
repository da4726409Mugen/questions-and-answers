//importar preguntas y respuestas
import { preguntasYRespuestas } from "./assets/preguntas-y-respuestas.js";

//Variables
let preguntasSeleccionadas = [];
let puntaje = 0;

//seleccionar los elementos del DOM
const contenedorPregunta = document.querySelector('#contenedor-pregunta');
const contenedorOpciones = document.querySelector('#contenedor-opciones');
const contenedorResultado = document.querySelector('#contenedor-resultado')

//PUNTO DE ENTRADA DEL PROGRAMA
mostrarTemas()

function mostrarTemas(){
    contenedorResultado.innerHTML ='';
contenedorPregunta.innerHTML = '<h2 class="pregunta">Seleciona el tema:</h2>'

Object.keys(preguntasYRespuestas).forEach((opcion)=>{
    contenedorOpciones.innerHTML += `<p class="opcion">${opcion.toUpperCase()}</p>`
});

const opciones = contenedorOpciones.querySelectorAll('.opcion');

opciones.forEach((opcion)=>{
    opcion.addEventListener('click',()=>{
        const tema = opcion.innerHTML.toLocaleLowerCase()
        seleccionarTema(tema)

    })
})
}
// mostrar las primera pregunta depediendo del tema que se ha seleccionado
function seleccionarTema(tema){
    preguntasSeleccionadas = preguntasYRespuestas[tema]
    
    mostrarPregunta(0)
}
 
    function mostrarPregunta(indice){

        if(indice >= preguntasSeleccionadas.length){
            mostrarResultado()
            return;
        }
        const {pregunta, respuestaCorrecta,respuestas} = preguntasSeleccionadas[indice];
       
    contenedorPregunta.innerHTML = `<h2 class="pregunta">${pregunta}</h2>`;

    mostrarOpciones(respuestas, respuestaCorrecta, indice);
    }

    function mostrarOpciones(respuestas, respuestaCorrecta, indice){
        contenedorOpciones.innerHTML = '';
        respuestas.forEach((respuesta)=>{
            contenedorOpciones.innerHTML += `<p class="opcion">${respuesta}</p>`;
        })

        const opciones = contenedorOpciones.querySelectorAll('.opcion');
        opciones.forEach((opcion)=>{
            opcion.addEventListener('click', ()=>{
                console.log(opcion.innerHTML);
                //compara lo que el usuario hizo click con la respuesta correcta
                if(opcion.innerHTML === respuestaCorrecta){
                    puntaje++;
                    opcion.classList.add('correcta');
                }else{
                opcion.classList.add('incorrecta');
                }


                setTimeout(()=>{
                    mostrarPregunta(indice + 1)
                },500)
                
            })
                
            })
        }

        function  mostrarResultado(){
            contenedorPregunta.innerHTML = '';
            contenedorOpciones.innerHTML = '';
            contenedorResultado.innerHTML = `<h2 class="total">Has acertado ${puntaje} de ${preguntasSeleccionadas.length} preguntas</h2>
            <div class="contenedor-boton">
                <botton id="reiniciarBtn">Reiniciar</bottom>
            </div>
            `
            const botonReiniciar = contenedorResultado.querySelector('#reiniciarBtn');
            botonReiniciar.addEventListener('click', ()=>{
                puntaje=0;
                mostrarTemas();
            })
        }