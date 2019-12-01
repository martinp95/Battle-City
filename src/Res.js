// Lista re recursos a precargar
var cache = [];
var imagenes = {
    jugador_parado_abajo : "res/player_down.png",
    jugador_parado_arriba : "res/player_up.png",
    jugador_parado_izquierda : "res/player_left.png",
    jugador_parado_derecha : "res/player_right.png",
    jugador_parado_abajo_escudo : "res/player_down_escudo.png",
    jugador_parado_arriba_escudo : "res/player_up_escudo.png",
    jugador_parado_izquierda_escudo : "res/player_left_escudo.png",
    jugador_parado_derecha_escudo : "res/player_right_escudo.png",
    fondo : "res/fondo.png",
    enemigo_parado_izquierda : "res/enemigo_parado_izquierda.png",
    enemigo_medio_parado_arriba : "res/enemigo_medio_parado_arriba.png",
    enemigo_fuerte_parado_abajo : "res/enemigo_fuerte_parado_abajo.png",
    disparo_jugador_abajo : "res/bullet_down.png",
    disparo_jugador_arriba : "res/bullet_up.png",
    disparo_jugador_izquierda : "res/bullet_left.png",
    disparo_jugador_derecha : "res/bullet_right.png",
    jugador_idle_abajo : "res/jugador_idle_abajo.png",
    jugador_idle_arriba : "res/jugador_idle_arriba.png",
    jugador_idle_izquierda : "res/jugador_idle_izquierda.png",
    jugador_idle_derecha : "res/jugador_idle_derecha.png",
    jugador_idle_abajo_escudo : "res/jugador_idle_abajo_escudo.png",
    jugador_idle_arriba_escudo : "res/jugador_idle_arriba_escudo.png",
    jugador_idle_izquierda_escudo : "res/jugador_idle_izquierda_escudo.png",
    jugador_idle_derecha_escudo : "res/jugador_idle_derecha_escudo.png",
    enemigo_aparece: "res/enemigo_aparece.png",
    enemigo_muriendo: "res/bullet_explosion.png",
    enemigo_idle_abajo : "res/enemigo_idle_abajo.png",
    enemigo_idle_arriba : "res/enemigo_idle_arriba.png",
    enemigo_idle_izquierda : "res/enemigo_idle_izquierda.png",
    enemigo_idle_derecha : "res/enemigo_idle_derecha.png",
    enemigo_medio_idle_abajo : "res/enemigo_medio_idle_abajo.png",
    enemigo_medio_idle_arriba : "res/enemigo_medio_idle_arriba.png",
    enemigo_medio_idle_izquierda : "res/enemigo_medio_idle_izquierda.png",
    enemigo_medio_idle_derecha : "res/enemigo_medio_idle_derecha.png",
    enemigo_fuerte_idle_abajo : "res/enemigo_fuerte_idle_abajo.png",
    enemigo_fuerte_idle_arriba : "res/enemigo_fuerte_idle_arriba.png",
    enemigo_fuerte_idle_izquierda : "res/enemigo_fuerte_idle_izquierda.png",
    enemigo_fuerte_idle_derecha : "res/enemigo_fuerte_idle_derecha.png",
    bloque_destruible : "res/wall_brick.png",
    bloque_irrompible : "res/wall_steel.png",
    bloque_agua : "res/water.png",
    bloque_limite : "res/bloque_limite.png",
    bullet_explosion : "res/bullet_explosion.png",
    base : "res/base.png",
    consumible_vida_extra : "res/consumible_vida_extra.png",
    consumible_mina : "res/consumible_mina.png",
    consumible_disparo : "res/consumible_disparo.png",
    consumible_granada : "res/consumible_granada.png",
    consumible_propulsion : "res/consumible_propulsion.png",
    consumible_invulnerabilidad : "res/consumible_invulnerabilidad.png",
    mina : "res/mina.png",
    tunel : "res/tunel.png",
    fondo_enemigos_restantes: "res/enemigos_restantes.png",
    fondo_vidas: "res/vidas.png",
    fondo_minas_restantes: "res/minas_restantes.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]] = new Image();
    cache[rutasImagenes[indice]].src = rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
