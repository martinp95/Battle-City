// Lista re recursos a precargar
var imagenes = {
    jugador_parado_abajo : "res/player_down.png",
    jugador_parado_arriba : "res/player_up.png",
    jugador_parado_izquierda : "res/player_left.png",
    jugador_parado_derecha : "res/player_right.png",
    fondo : "res/fondo.png",
    enemigo_parado_izquierda : "res/enemigo_parado_izquierda.png",
    disparo_jugador_abajo : "res/bullet_down.png",
    disparo_jugador_arriba : "res/bullet_up.png",
    disparo_jugador_izquierda : "res/bullet_left.png",
    disparo_jugador_derecha : "res/bullet_right.png",
    jugador_idle_abajo : "res/jugador_idle_abajo.png",
    jugador_idle_arriba : "res/jugador_idle_arriba.png",
    jugador_idle_izquierda : "res/jugador_idle_izquierda.png",
    jugador_idle_derecha : "res/jugador_idle_derecha.png",
    enemigo_idle_abajo : "res/enemigo_idle_abajo.png",
    enemigo_idle_arriba : "res/enemigo_idle_arriba.png",
    enemigo_idle_izquierda : "res/enemigo_idle_izquierda.png",
    enemigo_idle_derecha : "res/enemigo_idle_derecha.png",
    bloque_destruible : "res/wall_brick.png",
    bloque_irrompible : "res/wall_steel.png",
    bloque_agua : "res/water.png",
    bullet_explosion : "res/bullet_explosion.png",
    base : "res/base.png",
    consumible_vida_extra : "res/consumible_vida_extra.png",
    consumible_mina : "res/consumible_mina.png",
    mina : "res/mina.png",
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
