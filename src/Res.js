// Lista re recursos a precargar
var imagenes = {
    jugador : "res/player_down.png",
    fondo : "res/fondo.png",
    enemigo : "res/tank_basic_down.png",
    disparo_jugador : "res/bullet_down.png",
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
