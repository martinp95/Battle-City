var musicaInicio = new Audio("res/stage_start.ogg");


var efectos = {
    disparo : "res/bullet_shot.ogg",
    explosion : "res/explosion_1.ogg",
    golpeado: "res/bullet_hit_1.ogg",
    explosion_grande: "res/explosion_2.ogg",
    consumible_recogido: "res/powerup_pick.ogg"
};

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

