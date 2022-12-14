let base_preguntas = readText("../json/base-preguntas.json");
let interprete_base = JSON.parse(base_preguntas);
let pregunta
let posibles_respuestas
let preguntas_totales = interprete_base.length
let preguntas_correctas = 1;
let puntuacion = 0;
let num_aleatorio = 0
let paso = 0
let clicked = false
let btns = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
]

escogerPreguntaRandom();

function escogerPreguntaRandom(){
    num_aleatorio = Math.floor(Math.random()*interprete_base.length)
    obtenerPreguntas(num_aleatorio);
}

function obtenerPreguntas(n){
    progreso.innerHTML = preguntas_correctas +"/"+ preguntas_totales;
    puntos.innerHTML = puntuacion +" pts";
    if(interprete_base.length > 0){
        pregunta = interprete_base[n]
        select_id("pregunta").innerHTML = pregunta.pregunta;
        select_id("img-preg").setAttribute("src",pregunta.imagen);
        desordenarRespuestas(pregunta)
        style("img-preg").objectFit = pregunta.object_Fit;
    }else{
        Swal.fire({
            icon: 'success',
            title: 'Enhorabuena',
            text: 'Has terminado el juego con un total de '+ puntuacion + ' puntos' ,
            showConfirmButton:true,
            showCancelButton: true,
            confirmButtonText: "Home",
            cancelButtonText: "Reintentar"
          }).then((result) => {
            if (result['isConfirmed']){
              window.location.href = "../index.html"
            } else{
                window.location.href="quest.html"
            }
          })
    }
}

function desordenarRespuestas(pregunta){
    posibles_respuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3
    ]

    posibles_respuestas.sort(()=>Math.random()-0.5)

    select_id("btn1").innerHTML = posibles_respuestas[0];
    select_id("btn2").innerHTML = posibles_respuestas[1];
    select_id("btn3").innerHTML = posibles_respuestas[2];
    select_id("btn4").innerHTML = posibles_respuestas[3];
}

function pulsarBoton(i){
    btns[i].style.color = "white";
    
    if(posibles_respuestas[i] == pregunta.respuesta){
        if(!clicked){
        btns[i]. style.background = "#3E906F";
        btns[i].style.border = " solid 1px #3E906F";
        if(preguntas_correctas < 10){
            preguntas_correctas++;
        }
        puntuacion +=30;
        clicked = true;
        interprete_base.splice(num_aleatorio,1);
            setTimeout(() =>{
            reinicioBoton()
        },3000);
        }
    }else{
        paso ++;
        btns[i].style.background = "#903E54";
        btns[i].style.border = "solid 1px #903E54";
        if(puntuacion > 0 && paso == 1)puntuacion -=10;
        puntos.innerHTML = puntuacion +" pts";

    }

}

function reinicioBoton(){
    for(const btn of btns){
        btn. style.background = "#162B4E";
        btn.style.color = "white";
        btn.style.border =  "solid 1px #162B4E"; 
    }
    clicked = false
    paso = 0
    escogerPreguntaRandom();
}

function select_id(id){
    return document.getElementById(id)
}

function style(id){
    return select_id(id).style
}

function readText(ruta_local){
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",ruta_local,false);
    xmlhttp.send();
    if(xmlhttp.status == 200){
        texto = xmlhttp.responseText;
    }
    return texto;
}