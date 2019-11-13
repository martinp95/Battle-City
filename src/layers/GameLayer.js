class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350,200));
    }

    actualizar (){
        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
            var nuevoDisparo = this.enemigos[i].disparar();
            if ( nuevoDisparo != null ) {
                this.disparosEnemigo.push(nuevoDisparo);
            }
        }

        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }
        for (var i=0; i < this.disparosEnemigo.length; i++) {
            this.disparosEnemigo[i].actualizar();
        }

        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    reproducirEfecto(efectos.explosion);
                    this.disparosJugador.splice(i, 1);
                    i = i-1;
                    this.enemigos.splice(j, 1);
                    j = j-1;
                }
            }
        }
    }

    dibujar (){
        this.fondo.dibujar();
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }
        for (var i=0; i < this.disparosEnemigo.length; i++) {
            this.disparosEnemigo[i].dibujar();
        }
        this.jugador.dibujar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }
    }

    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.disparosJugador.push(nuevoDisparo);
            }
        }
        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }
    }
}