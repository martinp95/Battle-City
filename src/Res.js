// Lista re recursos a precargar
var imagenes = {
    jugador_parado_abajo : "res/player_down.png",
    jugador_parado_arriba : "res/player_up.png",
    jugador_parado_izquierda : "res/player_left.png",
    jugador_parado_derecha : "res/player_right.png",
    fondo : "res/fondo.png",
    enemigo : "res/tank_basic_down.png",
    disparo_jugador_abajo : "res/bullet_down.png",
    disparo_jugador_arriba : "res/bullet_up.png",
    disparo_jugador_izquierda : "res/bullet_left.png",
    disparo_jugador_derecha : "res/bullet_right.png",
    jugador_idle_abajo : "res/jugador_idle_abajo.png",
    jugador_idle_arriba : "res/jugador_idle_arriba.png",
    jugador_idle_izquierda : "res/jugador_idle_izquierda.png",
    jugador_idle_derecha : "res/jugador_idle_derecha.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
