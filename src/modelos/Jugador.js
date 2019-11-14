class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador, x, y);
        this.orientacion = orientaciones.arriba;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Animaciones
        this.aIdleAbajo = new Animacion(imagenes.jugador_idle_abajo,
            this.ancho, this.alto, 4, 2);
        this.aIdleArriba = new Animacion(imagenes.jugador_idle_arriba,
            this.ancho, this.alto, 4, 2);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_idle_izquierda,
            this.ancho, this.alto, 4, 2);
        this.aIdleDerecha = new Animacion(imagenes.jugador_idle_derecha,
            this.ancho, this.alto, 4, 2);
        this.animacion = this.aIdleArriba;

        // Disparo
        this.cadenciaDisparo = 15;
        this.tiempoDisparo = 0;
    }

    actualizar(){
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

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    moverX (direccion){
        this.vx = direccion * 1;
    }

    moverY (direccion){
        this.vy = direccion * 1;
    }

    disparar(){
        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            reproducirEfecto(efectos.disparo);
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }
    }

    dibujar() {
        this.animacion.dibujar(this.x, this.y);
    }

}