class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.scrollX = 0;
        this.scrollY = 0;
        reproducirMusica();
        this.bloques = [];
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.enemigos = [];
        this.cargarMapa("res/0.txt");
    }

    actualizar (){
        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.disparosJugador.splice(i, 1);
            }
        }

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

        // colisiones, disparoEnemigo - Jugador
        for (var i = 0; i < this.disparosEnemigo.length; i++){
            if(this.disparosEnemigo[i].colisiona(this.jugador)){
                this.iniciar();
            }
        }

       /*Falla no se puede probar aun // colisiones disparoEnemigo - disparoJugador
        for (var i = 0; i < this.disparosEnemigo.length; i++){
            for (var j = 0; i < this.disparosJugador.length; j++){
                if(this.disparosEnemigo[i].colisiona(this.disparosJugador[j])){
                    this.disparosJugador.splice(j,1);
                    j = j-1;
                    this.disparosEnemigo.splice(i, 1);
                    i = i-1;
                }
            }
        }*/
    }

    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "E":
                var enemigo = new Enemigo(x,y);
                enemigo.y = enemigo.y - enemigo.alto/2;
                this.enemigos.push(enemigo);
                break;
            case "1":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque, x, y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                break;
        }
    }

    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x - this.scrollX < 480*0.4){
            this.scrollX = this.jugador.x - 480*0.4;
        }
        // limite derecha
        if ( this.jugador.x - this.scrollX > 480*0.7){
            this.scrollX = this.jugador.x - 480*0.7;
        }

        //limite arriba
        if(this.jugador.y - this.scrollY < 320*0.4){
            this.scrollY = this.jugador.y - 320*0.4;
        }
        //limite abajo
        if(this.jugador.y - this.scrollY > 320*0.7){
            this.scrollY = this.jugador.y - 320*0.7;
        }
    }

    dibujar (){
        this.calcularScroll();
        this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i=0; i < this.disparosEnemigo.length; i++) {
            this.disparosEnemigo[i].dibujar(this.scrollX, this.scrollY);
        }
        this.jugador.dibujar(this.scrollX, this.scrollY);
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
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