class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y)

        this.vy = 0;
        this.vx = 1;

        // Disparo
        this.cadenciaDisparo = 60;
        this.tiempoDisparo = 0;
    }

    actualizar (){
        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }

        if ( this.x + this.ancho/2 >= 480 || this.x - this.ancho/2 <= 0){
            this.vx = this.vx * -1;
        }
        this.x = this.x + this.vx;
    }

    disparar(){
        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }
    }
}
