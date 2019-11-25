class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio();
        this.scrollX = 0;
        this.scrollY = 0;
        reproducirMusica();
        this.bloquesDestruibles = [];
        this.bloquesIrrompibles = [];
        this.bloquesAgua = [];
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.enemigos = [];
        this.cargarMapa("res/0.txt");
    }

    actualizar() {
        this.espacio.actualizar();
        console.log("disparosJugador: " + this.disparosJugador.length);

        // Eliminar disparosJugador sin velocidad
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0 && this.disparosJugador[i].vy == 0) {

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }

        //Eliminar disparosEnemigo sin velocidad
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            if (this.disparosEnemigo[i] != null &&
                this.disparosEnemigo[i].vx == 0 && this.disparosEnemigo[i].vy == 0) {

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosEnemigo[i]);
                this.disparosEnemigo.splice(i, 1);
            }
        }

        // Eliminar disparos fuera de pantalla
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()) {
                this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }

        //actualizar
        this.jugador.actualizar();
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
            //crear disparo enemigo
            var nuevoDisparo = this.enemigos[i].disparar();
            if (nuevoDisparo != null) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosEnemigo.push(nuevoDisparo);
            }
        }
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            this.disparosEnemigo[i].actualizar();
        }

        //colisiones disparoJugador
        for (var i = 0; i < this.disparosJugador.length; i++) {
            //colisiones, disparoJugador - Base
            if (this.disparosJugador[i].colisiona(this.base)) {
                this.iniciar();
            }
            // colisiones , disparoJugador - Enemigo
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {
                    this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i])
                    reproducirEfecto(efectos.explosion);
                    this.disparosJugador.splice(i, 1);
                    i = i - 1;
                    this.espacio.eliminarCuerpoDinamico(this.enemigos[i]);
                    this.enemigos.splice(j, 1);
                    j = j - 1;
                }
            }
            //colisiones, disparoJugador - BloqueDestruible
            for (var k = 0; k < this.bloquesDestruibles.length; k++) {
                if (this.disparosJugador[i] != null
                    && this.disparosJugador[i]
                        .colisiona(this.bloquesDestruibles[k])) {
                    this.espacio
                        .eliminarCuerpoEstatico(this.bloquesDestruibles[k]);
                    this.disparosJugador.splice(i, 1);
                    this.bloquesDestruibles.splice(k, 1);
                }
            }
        }

        // colisiones, disparoEnemigo
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            // colisiones, disparoEnemigo - Jugador
            if (this.disparosEnemigo[i].colisiona(this.jugador)) {
                this.iniciar();
            }
            //colisiones, disparoEnemigo - Base
            if (this.disparosEnemigo[i].colisiona(this.base)) {
                this.iniciar();
            }
            // colisiones, disparoEnemigo - BloqueDestruible
            for (var j = 0; j < this.bloquesDestruibles.length; j++) {
                if (this.disparosEnemigo[i] != null
                    && this.disparosEnemigo[i]
                        .colisiona(this.bloquesDestruibles[j])) {
                    this.espacio
                        .eliminarCuerpoEstatico(this.bloquesDestruibles[j]);
                    this.disparosEnemigo.splice(i, 1);
                    this.bloquesDestruibles.splice(j, 1);
                }
            }
        }

        //colision Jugador
        for(i = 0; i< this.bloquesAgua.length; i++){
            if(this.jugador.colisiona(this.bloquesAgua[i])){
                console.log("colsiona");
                console.log(this.jugador.vx);
                this.jugador.vx = this.jugador.vx < 2;
                this.jugador.vy = this.jugador.vy < 2;
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

    cargarMapa(ruta) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length - 1) * 16;
            this.altoMapa = (lineas.length - 1) * 16;
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 16 / 2 + j * 16; // x central
                    var y = 16 + i * 16; // y de abajo

                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch (simbolo) {
            case "E":
                var enemigo = new Enemigo(x, y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "J":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_destruible, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloquesDestruibles.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "2":
                var bloque = new Bloque(imagenes.bloque_irrompible, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                this.bloquesIrrompibles.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "3":
                var bloque = new Bloque(imagenes.bloque_agua, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                this.bloquesAgua.push(bloque);
                this.espacio.agregarCuerpoDinamico(bloque);
                break;
            case "B":
                this.base = new Bloque(imagenes.base, x, y);
                this.base.y = this.base.y - this.base.alto / 2;
                this.base.x = this.base.x - 8;
                this.espacio.agregarCuerpoEstatico(this.base);
                break;
        }
    }

    calcularScroll() {
        // limite izquierda
        if (this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }
        // limite derecha
        if (this.jugador.x < this.anchoMapa - 480 * 0.3) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }
        //limite abajo
        if (this.jugador.y < this.altoMapa) {
            if (this.jugador.y - this.scrollY > 320 * 0.7) {
                this.scrollY = Math.min(this.jugador.y - 320 * 0.7,
                    this.altoMapa - this.altoMapa * 0.823);
            }
        }
        //limite arriba
        if (this.jugador.y > 320 * 0.3) {
            if (this.jugador.y - this.scrollY < 320 * 0.3) {
                this.scrollY = this.jugador.y - 320 * 0.3;
            }
        }
    }

    dibujar() {
        this.calcularScroll();
        this.fondo.dibujar();
        this.base.dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.bloquesDestruibles.length; i++) {
            this.bloquesDestruibles[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.bloquesIrrompibles.length; i++) {
            this.bloquesIrrompibles[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.bloquesAgua.length; i++) {
            this.bloquesAgua[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            this.disparosEnemigo[i].dibujar(this.scrollX, this.scrollY);
        }
        this.jugador.dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
        }
    }

    procesarControles() {
        // disparar
        if (controles.disparo) {
            var nuevoDisparo = this.jugador.disparar();
            if (nuevoDisparo != null) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);
            }
        }
        // Eje X
        if (controles.moverX > 0) {
            this.jugador.moverX(1);

        } else if (controles.moverX < 0) {
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }
        // Eje Y
        if (controles.moverY > 0) {
            this.jugador.moverY(-1);

        } else if (controles.moverY < 0) {
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }
    }
}