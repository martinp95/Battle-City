var musicaInicio = new Audio("res/stage_start.ogg");


var efectos = {
    disparo : "res/bullet_shot.ogg",
    explosion : "res/explosion_1.ogg",
}

function reproducirMusica() {
    musicaInicio.play();
}

function pararMusica() {
    musicaInicio.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}

