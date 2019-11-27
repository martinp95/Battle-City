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
        this.consumibleVidaExtra = [];
        this.consumibleMina = [];
        this.consumibleDisparo = [];
        this.consumibleGranada = [];
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];
        this.minas = [];

        this.enemigos = [];
        this.cargarMapa("res/0.txt");
    }

    actualizar() {
        this.espacio.actualizar();

        //generar consumibleVidaExtra
        if (this.iteracionesCrearConsumebleVida == null) {
            this.iteracionesCrearConsumebleVida = 200;
        }
        this.iteracionesCrearConsumebleVida--;
        if (this.iteracionesCrearConsumebleVida < 0) {
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var consumible = new ConsumibleVidaExtra(rX, rY);
            consumible.y = consumible.y - consumible.alto / 2;
            this.consumibleVidaExtra.push(consumible);
            this.espacio.agregarCuerpoDinamico(consumible);
            this.iteracionesCrearConsumebleVida = 2000;
        }

        //generar consumibleMina
        if (this.iteracionesCrearConsumibleMina == null) {
            this.iteracionesCrearConsumibleMina = 0;
        }
        this.iteracionesCrearConsumibleMina--;
        if (this.iteracionesCrearConsumibleMina < 0) {
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var consumible = new ConsumibleMina(rX, rY);
            consumible.y = consumible.y - consumible.alto / 2;
            this.consumibleMina.push(consumible);
            this.espacio.agregarCuerpoDinamico(consumible);
            this.iteracionesCrearConsumibleMina = 3000;
        }

        //generar consumibleDisparo
        if(this.iteracionesCrearConsumibleDisparo == null){
            this.iteracionesCrearConsumibleDisparo = 0;
        }
        this.iteracionesCrearConsumibleDisparo--;
        if(this.iteracionesCrearConsumibleDisparo < 0){
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var consumible = new ConsumibleDisparo(rX, rY);
            consumible.y = consumible.y - consumible.alto / 2;
            this.consumibleDisparo.push(consumible);
            this.espacio.agregarCuerpoDinamico(consumible);
            this.iteracionesCrearConsumibleDisparo = 3000;
        }

        //generar ConsumibleGranada
        if(this.iteracionesCrearConsumibleGranada == null){
            this.iteracionesCrearConsumibleGranada = 0;
        }
        this.iteracionesCrearConsumibleGranada--;
        if(this.iteracionesCrearConsumibleGranada < 0){
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var consumible = new ConsumibleGranada(rX, rY);
            consumible.y = consumible.y - consumible.alto / 2;
            this.espacio.agregarCuerpoDinamico(consumible);
            this.consumibleGranada.push(consumible);
            this.iteracionesCrearConsumibleGranada = 3000;
        }

        // Eliminar disparosJugador sin velocidad
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0 && this.disparosJugador[i].vy == 0) {
                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
                i = i - 1;
            }
        }

        //Eliminar disparosEnemigo sin velocidad
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            if (this.disparosEnemigo[i] != null &&
                this.disparosEnemigo[i].vx == 0 && this.disparosEnemigo[i].vy == 0) {
                this.espacio
                    .eliminarCuerpoDinamico(this.disparosEnemigo[i]);
                this.disparosEnemigo.splice(i, 1);
                i = i - 1;
            }
        }

        // Eliminar disparos fuera de pantalla
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()) {
                this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
                i = i - 1;
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
        for (var i = 0; i < this.minas.length; i++) {
            this.minas[i].actualizar();
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
                    this.espacio.eliminarCuerpoDinamico(this.enemigos[j]);
                    this.enemigos.splice(j, 1);
                    j = j - 1;
                }
            }
        }

        //colisiones, disparoJugador - BloqueDestruible
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var k = 0; k < this.bloquesDestruibles.length; k++) {
                if (this.disparosJugador[i] != null
                    && this.disparosJugador[i]
                        .colisiona(this.bloquesDestruibles[k])) {
                    this.espacio
                        .eliminarCuerpoEstatico(this.bloquesDestruibles[k]);
                    this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    this.bloquesDestruibles.splice(k, 1);
                    i = i - 1;
                    k = k - 1;
                }
            }
        }

        // colisiones, disparoEnemigo
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            //colisiones, disparoEnemigo - Base
            if (this.disparosEnemigo[i].colisiona(this.base)) {
                this.iniciar();
            }
            // colisiones, disparoEnemigo - Jugador
            if (this.disparosEnemigo[i].colisiona(this.jugador)) {
                this.jugador.vidas--;
                this.espacio.eliminarCuerpoDinamico(this.enemigos[i]);
                this.disparosEnemigo.splice(i, 1);
                i = i - 1;
                if (this.jugador.vidas == 0) {
                    this.iniciar();
                }
            }
        }

        // colisiones, disparoEnemigo - BloqueDestruible
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            for (var j = 0; j < this.bloquesDestruibles.length; j++) {
                if (this.disparosEnemigo[i] != null
                    && this.disparosEnemigo[i]
                        .colisiona(this.bloquesDestruibles[j])) {
                    this.espacio
                        .eliminarCuerpoEstatico(this.bloquesDestruibles[j]);
                    this.espacio.eliminarCuerpoDinamico(this.disparosEnemigo[i]);
                    this.disparosEnemigo.splice(i, 1);
                    this.bloquesDestruibles.splice(j, 1);
                    i = i - 1;
                    j = j - 1;
                }
            }
        }

        //colision Jugador - bloque agua
        for (var i = 0; i < this.bloquesAgua.length; i++) {
            if (this.jugador.colisiona(this.bloquesAgua[i])) {
                this.jugador.slow = true;
                this.jugador.tiempoSlow = 120;
            }
        }

        //colision jugador consumible vidas
        for (var i = 0; i < this.consumibleVidaExtra.length; i++) {
            if (this.consumibleVidaExtra[i].tiempoVida > 0) {
                //decremento el tiempo que le queda en pantalla
                this.consumibleVidaExtra[i].tiempoVida--;

                if (this.consumibleVidaExtra[i].colisiona(this.jugador)) {
                    this.jugador.vidas++;
                    this.espacio.eliminarCuerpoDinamico(this.consumibleVidaExtra[i]);
                    this.consumibleVidaExtra.splice(i, 1);
                }
            } else {
                this.espacio.eliminarCuerpoDinamico(this.consumibleVidaExtra[i]);
                this.consumibleVidaExtra.splice(i, 1);
            }
        }

        //colision jugador consumible minas
        for (var i = 0; i < this.consumibleMina.length; i++) {
            if (this.consumibleMina[i].tiempoVida > 0) {
                this.consumibleMina[i].tiempoVida--;
                if (this.consumibleMina[i].colisiona(this.jugador)) {
                    this.jugador.minas = 3;
                    this.espacio.eliminarCuerpoDinamico(this.consumibleMina[i]);
                    this.consumibleMina.splice(i, 1);
                    i = i - 1;
                }
            } else {
                this.espacio.eliminarCuerpoDinamico(this.consumibleMina[i]);
                this.consumibleMina.splice(i, 1);
                i = i - 1;
            }
        }

        //colision jugador consumibleDisparo
        for(var i = 0; i < this.consumibleDisparo.length; i++){
            if(this.consumibleDisparo[i].tiempoVida > 0){
                this.consumibleDisparo[i].tiempoVida--;
                if (this.consumibleDisparo[i].colisiona(this.jugador)){
                    this.jugador.disparoMejorado = true;
                    this.jugador.reiniciarTiempoDisparoMejorado();
                    this.espacio.eliminarCuerpoDinamico(this.consumibleDisparo[i]);
                    this.consumibleDisparo.splice(i, 1);
                    i = i - 1;
                }
            }else{
                this.espacio.eliminarCuerpoDinamico(this.consumibleDisparo[i]);
                this.consumibleDisparo.splice(i, 1);
                i = i - 1;
            }
        }

        //colisiona juagador consumibleGranada
        for(var i = 0; i < this.consumibleGranada.length; i++){
            if (this.consumibleGranada[i].tiempoVida > 0){
                this.consumibleGranada[i].tiempoVida--;
                if(this.consumibleGranada[i].colisiona(this.jugador)){
                    //elimino a todos los enemigos de la partida
                    for(var j = 0; j < this.enemigos.length; j++){
                        this.espacio.eliminarCuerpoDinamico(this.enemigos[i]);
                        this.enemigos.splice(j, 1);
                        j = j - 1;
                    }
                    this.espacio.eliminarCuerpoDinamico(this.consumibleGranada[i]);
                    this.consumibleGranada.splice(i, 1);
                    i = i - 1;
                }
            }else{
                this.espacio.eliminarCuerpoDinamico(this.consumibleGranada[i]);
                this.consumibleGranada.splice(i, 1);
                i = i - 1;
            }
        }

        //Colision enemigos con mina
        for (var i = 0; i < this.minas.length; i++) {
            if (this.minas[i].activa) {
                for (var j = 0; j < this.enemigos.length; j++) {
                    if (this.enemigos[j].colisiona(this.minas[i])) {
                        //borro la mina y borro el enemigo
                        this.espacio.eliminarCuerpoDinamico(this.enemigos[j]);
                        this.espacio.eliminarCuerpoDinamico(this.minas[i]);
                        this.enemigos.splice(j, 1);
                        this.minas.splice(i, 1);
                        i = i - 1;
                        j = j - 1;
                    }
                }
            }
        }

        //colision jugador con mina
        for (var i = 0; i < this.minas.length; i++) {
            if (this.minas[i].activa) {
                if (this.minas[i].colisiona(this.jugador)) {
                    console.log(this.jugador.vidas);
                    this.jugador.vidas--;
                    if (this.jugador.vidas == 0) {
                        this.iniciar();
                    }
                    this.espacio.eliminarCuerpoDinamico(this.minas[i]);
                    this.minas.splice(i, 1);
                    i = i - 1;
                }
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
        for (var i = 0; i < this.minas.length; i++) {
            this.minas[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.bloquesDestruibles.length; i++) {
            this.bloquesDestruibles[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.bloquesIrrompibles.length; i++) {
            this.bloquesIrrompibles[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.bloquesAgua.length; i++) {
            this.bloquesAgua[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.consumibleVidaExtra.length; i++) {
            this.consumibleVidaExtra[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.consumibleMina.length; i++) {
            this.consumibleMina[i].dibujar(this.scrollX, this.scrollY);
        }
        for(var i = 0; i < this.consumibleDisparo.length; i++){
            this.consumibleDisparo[i].dibujar(this.scrollX, this.scrollY);
        }
        for(var i = 0; i < this.consumibleGranada.length; i++){
            this.consumibleGranada[i].dibujar(this.scrollX, this.scrollY);
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
        //colocar mina
        if (controles.plantarMina) {
            var nuevaMina = this.jugador.plantarMina();
            if (nuevaMina != null) {
                this.espacio.agregarCuerpoDinamico(nuevaMina);
                this.minas.push(nuevaMina);
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