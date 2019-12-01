// Canvas y contexto del Canvas
var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var escaladoMinimo = 1;

// Capas
var layer;
var gameLayer;
var menuLayer;


// Controles
var controles = {};

// Inicio capas y bucle del juego
function iniciarJuego() {
    menuLayer = new MenuLayer();
    layer = menuLayer;
    setInterval(loop, 1000 / 30);
}

function loop(){
    console.log("loop - ");
    layer.actualizar();
    layer.procesarControles();
    layer.dibujar();
}

// Cambio de escalado
window.addEventListener('load', this.resize, false);

function resize() {
    console.log("Resize");
    var escaladoAncho = parseFloat(window.innerWidth / canvas.width);
    var escaladoAlto = parseFloat(window.innerHeight / canvas.height);

    escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

    canvas.width = this.canvas.width*escaladoMinimo;
    canvas.height = this.canvas.height*escaladoMinimo;

    contexto.scale(escaladoMinimo,escaladoMinimo);
}