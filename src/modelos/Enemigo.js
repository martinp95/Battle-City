class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo_parado_izquierda, x, y);
        this.orientacion = orientaciones.izquierda;
        this.vy = 0;
        this.vx = 1;

        // Animaciones
        this.aIdleAbajo = new Animacion(imagenes.enemigo_idle_abajo,
            this.ancho, this.alto, 3, 2);
        this.aIdleArriba = new Animacion(imagenes.enemigo_idle_arriba,
            this.ancho, this.alto, 3, 2);
        this.aIdleIzquierda = new Animacion(imagenes.enemigo_idle_izquierda,
            this.ancho, this.alto, 3, 2);
        this.aIdleDerecha = new Animacion(imagenes.enemigo_idle_derecha,
            this.ancho, this.alto, 3, 2);
        this.animacion = this.aIdleIzquierda;

        // Disparo
        this.cadenciaDisparo = 60;
        this.tiempoDisparo = 0;
    }

    actualizar (){
        this.animacion.actualizar();

        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }
        if ( this.vy > 0){
            this.orientacion = orientaciones.abajo;
        }
        if ( this.vy < 0 ){
            this.orientacion = orientaciones.arriba;
        }

        //Seleccion de animacion
        if ( this.vx != 0 ){
            if(this.orientacion == orientaciones.derecha){
                this.animacion = this.aIdleDerecha;
            }
            if (this.orientacion == orientaciones.izquierda){
                this.animacion = this.aIdleIzquierda;
            }
        }
        if ( this.vy != 0){
            if (this.orientacion == orientaciones.abajo){
                this.animacion = this.aIdleAbajo;
            }
            if (this.orientacion == orientaciones.arriba){
                this.animacion = this.aIdleArriba;
            }
        }

        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }
    }

    disparar(){
        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = null;
            if(this.orientacion == orientaciones.izquierda){
                disparo = new DisparoEnemigo(imagenes.disparo_jugador_izquierda, this.x, this.y)
                disparo.vx = disparo.vx * -1;
            }else if (this.orientacion == orientaciones.derecha){
                disparo = new DisparoEnemigo(imagenes.disparo_jugador_derecha, this.x, this.y);
            }else if( this.orientacion == orientaciones.arriba){
                disparo = new DisparoEnemigo(imagenes.disparo_jugador_arriba, this.x, this.y,true);
                disparo.vy = disparo.vy * -1;
            }else if (this.orientacion == orientaciones.abajo){
                disparo = new DisparoEnemigo(imagenes.disparo_jugador_abajo, this.x, this.y,true);
            }
            return disparo;
        } else {
            return null;
        }
    }

    dibujar(scrollX, scrollY) {
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }
}
