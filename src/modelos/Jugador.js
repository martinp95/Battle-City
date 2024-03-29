class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador_parado_abajo, x, y);
        this.orientacion = orientaciones.arriba;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Animaciones
        this.aIdleAbajo = new Animacion(imagenes.jugador_idle_abajo,
            this.ancho, this.alto, 3, 2);
        this.aIdleArriba = new Animacion(imagenes.jugador_idle_arriba,
            this.ancho, this.alto, 3, 2);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_idle_izquierda,
            this.ancho, this.alto, 3, 2);
        this.aIdleDerecha = new Animacion(imagenes.jugador_idle_derecha,
            this.ancho, this.alto, 3, 2);
        this.aParadoAbajo = new Animacion(imagenes.jugador_parado_abajo,
            this.ancho, this.alto, 1, 1);
        this.aParadoArriba = new Animacion(imagenes.jugador_parado_arriba,
            this.ancho, this.alto, 1, 1);
        this.aParadoDerecha = new Animacion(imagenes.jugador_parado_derecha,
            this.ancho, this.alto, 1, 1);
        this.aParadoIzquierda = new Animacion(imagenes.jugador_parado_izquierda,
            this.ancho, this.alto, 1, 1);

        //escudo
        // Animaciones
        this.aIdleAbajoEscudo = new Animacion(imagenes.jugador_idle_abajo_escudo,
            this.ancho, this.alto, 3, 2);
        this.aIdleArribaEscudo = new Animacion(imagenes.jugador_idle_arriba_escudo,
            this.ancho, this.alto, 3, 2);
        this.aIdleIzquierdaEscudo = new Animacion(imagenes.jugador_idle_izquierda_escudo,
            this.ancho, this.alto, 3, 2);
        this.aIdleDerechaEscudo = new Animacion(imagenes.jugador_idle_derecha_escudo,
            this.ancho, this.alto, 3, 2);
        this.aParadoAbajoEscudo = new Animacion(imagenes.jugador_parado_abajo_escudo,
            this.ancho, this.alto, 1, 1);
        this.aParadoArribaEscudo = new Animacion(imagenes.jugador_parado_arriba_escudo,
            this.ancho, this.alto, 1, 1);
        this.aParadoDerechaEscudo = new Animacion(imagenes.jugador_parado_derecha_escudo,
            this.ancho, this.alto, 1, 1);
        this.aParadoIzquierdaEscudo = new Animacion(imagenes.jugador_parado_izquierda_escudo,
            this.ancho, this.alto, 1, 1);
        this.animacion = this.aIdleArriba;

        // Disparo
        this.cadenciaDisparo = 15;
        this.tiempoDisparo = 0;
        this.disparoMejorado = false;
        this.cadenciaDisparoMejorado = 5;
        this.tiempoDisparoMejorado = 180;
        //slow
        this.slow = false;
        this.tiempoSlow = 0;
        //vidas
        this.vidas = 4;
        //minas
        this.minas = 0;
        this.tiempoMina = 0;
        this.cadenciaMina = 10;
        //propulsion
        this.propulsion = false;
        this.tiempoPropulsion = 150;
        this.propulsionActica = false;
        //invulnerable
        this.invulnerable = false;
        this.tiempoInvulnerable = 300;
    }

    actualizar() {
        this.animacion.actualizar();

        // Establecer orientación
        if (this.vx > 0) {
            this.orientacion = orientaciones.derecha;
        }
        if (this.vx < 0) {
            this.orientacion = orientaciones.izquierda;
        }
        if (this.vy > 0) {
            this.orientacion = orientaciones.abajo;
        }
        if (this.vy < 0) {
            this.orientacion = orientaciones.arriba;
        }

        //Seleccion de animacion
        if (this.vx != 0) {
            if (this.orientacion == orientaciones.derecha) {
                if(this.invulnerable){
                    this.animacion = this.aIdleDerechaEscudo;
                }else {
                    this.animacion = this.aIdleDerecha;
                }
            }
            if (this.orientacion == orientaciones.izquierda) {
                if(this.invulnerable){
                    this.animacion = this.aIdleIzquierdaEscudo;
                }else {
                    this.animacion = this.aIdleIzquierda;
                }
            }
        }
        if (this.vy != 0) {
            if (this.orientacion == orientaciones.abajo) {
                if(this.invulnerable){
                    this.animacion = this.aIdleAbajoEscudo;
                }else{
                    this.animacion = this.aIdleAbajo;
                }
            }
            if (this.orientacion == orientaciones.arriba) {
                if(this.invulnerable){
                    this.animacion = this.aIdleArribaEscudo;
                }else{
                    this.animacion = this.aIdleArriba;
                }
            }
        }
        if (this.vx == 0 && this.vy == 0) {
            if (this.orientacion == orientaciones.abajo) {
                if(this.invulnerable){
                    this.animacion = this.aParadoAbajoEscudo;
                }else{
                    this.animacion = this.aParadoAbajo;
                }
            }
            if (this.orientacion == orientaciones.arriba) {
                if(this.invulnerable){
                    this.animacion = this.aParadoArribaEscudo;
                }else{
                    this.animacion = this.aParadoArriba;
                }
            }
            if (this.orientacion == orientaciones.derecha) {
                if(this.invulnerable){
                    this.animacion = this.aParadoDerechaEscudo;
                }else{
                    this.animacion = this.aParadoDerecha;
                }
            }
            if (this.orientacion == orientaciones.izquierda) {
                if(this.invulnerable){
                    this.animacion = this.aParadoIzquierdaEscudo;
                }else{
                    this.animacion = this.aParadoIzquierda;
                }
            }
        }
        // Tiempo Disparo
        if (this.tiempoDisparo > 0) {
            this.tiempoDisparo--;
        }

        //TiempoDisparoMejorado
        if(this.tiempoDisparoMejorado > 0 ){
            this.tiempoDisparoMejorado--;
        }else{
            this.disparoMejorado = false;
        }

        //Tiempo slow
        if (this.tiempoSlow > 0) {
            this.tiempoSlow--;
        } else {
            this.slow = false;
        }

        //Tiempo mina
        if (this.tiempoMina > 0) {
            this.tiempoMina--;
        }

        //Tiempo Propulsion
        if(this.tiempoPropulsion > 0 ){
            this.tiempoPropulsion--;
        }else{
            this.propulsion = false;
            this.propulsionActica = false;
        }

        // Tiempo invulnerable
        if(this.tiempoInvulnerable > 0){
            this.tiempoInvulnerable--;
        }else {
            this.invulnerable = false;
        }
    }

    moverX(direccion) {
        if (this.slow) {
            this.vx = direccion * 0.5;
        }else if(this.propulsionActica){
            this.vx = direccion * 3;
        } else {
            this.vx = direccion * 1.5;
        }
    }

    moverY(direccion) {
        if (this.slow) {
            this.vy = direccion * 0.5;
        }else if(this.propulsionActica){
            this.vy = direccion * 3;
        } else {
            this.vy = direccion * 1.5;
        }
    }

    plantarMina() {
        if(this.minas > 0) {
            if (this.tiempoMina == 0) {
                this.tiempoMina = this.cadenciaMina;
                var mina = new Mina(this.x, this.y);
                this.minas--;
                return mina;
            } else {
                return null;
            }
        }else{
            return null;
        }
    }

    activarPropulsion(){
        if(this.propulsion){
            this.propulsionActica = true;
        }
    }

    disparar() {
        if (this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            if(this.disparoMejorado){
                this.tiempoDisparo = this.cadenciaDisparoMejorado;
            }else {
                this.tiempoDisparo = this.cadenciaDisparo;
            }
            reproducirEfecto(efectos.disparo);
            var disparo = null;
            if (this.orientacion == orientaciones.izquierda) {
                disparo = new DisparoJugador(imagenes.disparo_jugador_izquierda, this.x, this.y);
                disparo.vx = disparo.vx * -1;
            } else if (this.orientacion == orientaciones.derecha) {
                disparo = new DisparoJugador(imagenes.disparo_jugador_derecha, this.x, this.y);
            } else if (this.orientacion == orientaciones.arriba) {
                disparo = new DisparoJugador(imagenes.disparo_jugador_arriba, this.x, this.y, true);
                disparo.vy = disparo.vy * -1;
            } else if (this.orientacion == orientaciones.abajo) {
                disparo = new DisparoJugador(imagenes.disparo_jugador_abajo, this.x, this.y, true);
            }
            return disparo;
        } else {
            return null;
        }
    }

    dibujar(scrollX, scrollY) {
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

    reiniciarTiempoDisparoMejorado(){
        this.tiempoDisparoMejorado = 180;
    }

    reiniciarTiempoPropulsion(){
        this.tiempoPropulsion = 150;
    }

    reiniciarTiempoInvulnerable(){
        this.tiempoInvulnerable = 300;
    }
}