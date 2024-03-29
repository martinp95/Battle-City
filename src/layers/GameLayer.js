class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
        this.nivel = niveles.uno;
    }

    iniciar() {
        this.espacio = new Espacio();
        this.scrollX = 0;
        this.scrollY = 0;

        reproducirMusica();
        this.bloquesDestruibles = [];
        this.bloquesIrrompibles = [];
        this.bloquesAgua = [];
        this.bloquesLimite = [];
        this.tuneles = [];
        this.consumibleVidaExtra = [];
        this.consumibleMina = [];
        this.consumibleDisparo = [];
        this.consumibleGranada = [];
        this.consumiblePropulsion = [];
        this.consumibleInvulnerabilidad = [];

        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);
        this.fondoEnemigosRestantes = new Fondo(imagenes.fondo_enemigos_restantes, 480*0.92,320*0.03)
        this.textoEnemigosRestantes = new Texto(0,480*0.95,320*0.05 );
        this.fondoVidas = new Fondo(imagenes.fondo_vidas,480*0.82,320*0.03)
        this.textoVidas = new Texto(0,480*0.85,320*0.05 );
        this.fondoMinasRestantes = new Fondo(imagenes.fondo_minas_restantes, 480*0.72,320*0.03);
        this.textoMinasRestantes = new Texto(0,480*0.75,320*0.05 );

        this.disparosJugador = [];
        this.disparosEnemigo = [];
        this.minas = [];

        this.enemigosRestantes = 0;
        this.enemigosEliminados = 0;
        this.enemigos = [];

        if (this.nivel == niveles.dos) {
            this.enemigosRestantes = 3 * 2;
            this.textoEnemigosRestantes.valor = this.enemigosRestantes;
            this.cargarMapa("res/1.txt");
        }else if (this.nivel == niveles.tres) {
            this.enemigosRestantes = 3 * 3;
            this.textoEnemigosRestantes.valor = this.enemigosRestantes;
            this.cargarMapa("res/2.txt")
        } else {
            this.enemigosRestantes = 3;
            this.textoEnemigosRestantes.valor = this.enemigosRestantes;
            this.cargarMapa("res/0.txt")
        }
        this.textoVidas.valor = this.jugador.vidas
    }

    actualizar() {


        //Controlar el nivel en el que se está jugando
        if(this.nivel == niveles.uno
            && this.enemigosEliminados == 3
            && this.enemigosRestantes == 0){
            console.log("Pasa a nivel 2");
            this.nivel = niveles.dos;
            this.iniciar();
        } else if (this.nivel == niveles.dos
            && this.enemigosEliminados == 3*niveles.dos
            && this.enemigosRestantes == 0){
            console.log("Pasa a nivel 3");
            this.nivel = niveles.tres;
            this.iniciar();
        } else if (this.nivel == niveles.tres
            && this.enemigosEliminados == 3*niveles.tres
            && this.enemigosRestantes == 0){
            console.log("Gana el juego");
        }

        //generar enemigos periódicos
        if (this.iteracionesCrearEnemigo == null || this.iteracionesCrearEnemigo < 0) {
            this.iteracionesCrearEnemigo = 100;
        }
        this.iteracionesCrearEnemigo--;
        if(this.enemigosRestantes > 0 && this.iteracionesCrearEnemigo == 0){
            var creaEnemigo =     true;
            var tipoEnemigo =  Math.floor(Math.random() * 3)
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var nuevoEnemigo = new Enemigo(rX,rY);
            if (tipoEnemigo == 1) {
                nuevoEnemigo = new EnemigoMedio(rX, rY);
            }
            if (tipoEnemigo == 2) {
                nuevoEnemigo = new EnemigoFuerte(rX, rY);
            }
            for (var i = 0; i < this.bloquesDestruibles.length; i++) {
                if(nuevoEnemigo.colisiona(this.bloquesDestruibles[i])){
                    creaEnemigo = false;
                }
            }
            for (var i = 0; i < this.bloquesIrrompibles.length; i++) {
                if(nuevoEnemigo.colisiona(this.bloquesIrrompibles[i])){
                    creaEnemigo = false;
                }
            }
            if (creaEnemigo){
                this.enemigos.push(nuevoEnemigo);
                this.espacio.agregarCuerpoDinamico(nuevoEnemigo);
                this.enemigosRestantes--;
            }
            this.iteracionesCrearEnemigo = 200;
        }

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
            this.iteracionesCrearConsumibleMina = 300;
        }
        this.iteracionesCrearConsumibleMina--;
        if (this.iteracionesCrearConsumibleMina < 0) {
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var consumible = new ConsumibleMina(rX, rY);
            consumible.y = consumible.y - consumible.alto / 2;
            this.consumibleMina.push(consumible);
            this.espacio.agregarCuerpoDinamico(consumible);
            this.iteracionesCrearConsumibleMina = 500;
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
            this.iteracionesCrearConsumibleDisparo = 200;
        }

        //generar ConsumibleGranada
        if(this.iteracionesCrearConsumibleGranada == null){
            this.iteracionesCrearConsumibleGranada = 500;
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

        //generar ConsumiblePropulsion
        if(this.iteracionesCrearConsumiblePropulsion == null){
            this.iteracionesCrearConsumiblePropulsion = 100;
        }
        this.iteracionesCrearConsumiblePropulsion--;
        if(this.iteracionesCrearConsumiblePropulsion < 0){
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var consumible = new ConsumiblePropulsion(rX, rY);
            consumible.y = consumible.y - consumible.alto / 2;
            this.espacio.agregarCuerpoDinamico(consumible);
            this.consumiblePropulsion.push(consumible);
            this.iteracionesCrearConsumiblePropulsion = 300;
        }

        //generar consumibleInvulnerabilidad
        if(this.iteracionesCrearConsumibleInvulnerabilidad == null){
            this.iteracionesCrearConsumibleInvulnerabilidad = 0;
        }
        this.iteracionesCrearConsumibleInvulnerabilidad--;
        if(this.iteracionesCrearConsumibleInvulnerabilidad < 0){
            var rX = Math.random() * (600 - 60) + 60;
            var rY = Math.random() * (300 - 60) + 60;
            var consumible = new ConsumibleInvulnerabilidad(rX, rY);
            consumible.y = consumible.y - consumible.alto / 2;
            this.espacio.agregarCuerpoDinamico(consumible);
            this.consumibleInvulnerabilidad.push(consumible);
            this.iteracionesCrearConsumibleInvulnerabilidad = 3050;
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

        //eliminar disparos enemigo fuera de pantalla
        for(var i = 0; i < this.disparosEnemigo.length;i++){
            if(this.disparosEnemigo[i] != null && !this.disparosEnemigo[i].estaEnPantalla()){
                this.espacio.eliminarCuerpoDinamico(this.disparosEnemigo[i]);
                this.disparosEnemigo.splice(i, 1);
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
                    if(this.enemigos[j] instanceof EnemigoMedio
                        && this.enemigos[j].vidas > 1) {
                        this.enemigos[j].vidas--;
                        this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                        reproducirEfecto(efectos.golpeado);
                        this.disparosJugador.splice(i, 1);
                        i = i - 1;
                    }else if (this.enemigos[j] instanceof EnemigoFuerte
                        && !this.jugador.disparoMejorado){
                        this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                        reproducirEfecto(efectos.golpeado);
                        this.disparosJugador.splice(i, 1);
                        i = i - 1;
                    }else {
                        this.espacio.eliminarCuerpoDinamico(this.disparosJugador[i]);
                        reproducirEfecto(efectos.explosion);
                        this.disparosJugador.splice(i, 1);
                        i = i - 1;
                        this.enemigosEliminados++;
                        this.enemigos[j].impactado()
                    }
                }
            }
        }

        // Enemigos muertos fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto  ) {
                this.espacio.eliminarCuerpoDinamico(this.enemigos[j]);
                this.enemigos.splice(j, 1);
                j = j-1;
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
                if(!this.jugador.invulnerable) {
                    this.jugador.vidas--;
                }
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
                this.jugador.tiempoSlow = 60;
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
                    reproducirEfecto(efectos.consumible_recogido);
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
                    reproducirEfecto(efectos.consumible_recogido);
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
                    reproducirEfecto(efectos.consumible_recogido);
                    i = i - 1;
                }
            }else{
                this.espacio.eliminarCuerpoDinamico(this.consumibleDisparo[i]);
                this.consumibleDisparo.splice(i, 1);
                i = i - 1;
            }
        }

        //colision jugador consumiblePropulsion
        for(var i = 0; i < this.consumiblePropulsion.length; i++){
            if(this.consumiblePropulsion[i].tiempoVida > 0){
                this.consumiblePropulsion[i].tiempoVida--;
                if(this.consumiblePropulsion[i].colisiona(this.jugador)){
                    this.jugador.propulsion = true;
                    this.jugador.reiniciarTiempoPropulsion();
                    this.espacio.eliminarCuerpoDinamico(this.consumiblePropulsion[i]);
                    this.consumiblePropulsion.splice(i, 1);
                    reproducirEfecto(efectos.consumible_recogido);
                    i = i - 1;
                }
            }else{
                this.espacio.eliminarCuerpoDinamico(this.consumiblePropulsion[i]);
                this.consumiblePropulsion.splice(i, 1);
                i = i - 1;
            }
        }

        //colision jugador consumibleInvulnerabilidad
        for(var i = 0; i < this.consumibleInvulnerabilidad.length; i++){
            if(this.consumibleInvulnerabilidad[i].tiempoVida > 0){
                this.consumibleInvulnerabilidad[i].tiempoVida--;
                if(this.consumibleInvulnerabilidad[i].colisiona(this.jugador)){
                    this.jugador.invulnerable = true;
                    this.jugador.reiniciarTiempoInvulnerable();
                    this.espacio.eliminarCuerpoDinamico(this.consumibleInvulnerabilidad[i]);
                    this.consumibleInvulnerabilidad.splice(i, 1);
                    reproducirEfecto(efectos.consumible_recogido);
                    i = i - 1;
                }
            }else{
                this.espacio.eliminarCuerpoDinamico(this.consumibleInvulnerabilidad[i]);
                this.consumibleInvulnerabilidad.splice(i, 1);
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
                        this.enemigosEliminados++;
                        j = j - 1;
                    }
                    this.espacio.eliminarCuerpoDinamico(this.consumibleGranada[i]);
                    this.consumibleGranada.splice(i, 1);
                    reproducirEfecto(efectos.explosion_grande);
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
                        this.enemigosEliminados++;
                        reproducirEfecto(efectos.explosion_grande);
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
                    if(!this.jugador.invulnerable) {
                        this.jugador.vidas--;
                    }
                    if (this.jugador.vidas == 0) {
                        this.iniciar();
                    }
                    this.espacio.eliminarCuerpoDinamico(this.minas[i]);
                    this.minas.splice(i, 1);
                    reproducirEfecto(efectos.explosion_grande);
                    i = i - 1;
                }
            }
        }

        //colision tunel
        for(var i = 0;i < this.tuneles.length; i++){
            if(this.jugador.colisiona(this.tuneles[i])){
                if(! this.tuneles[i].usada){
                    this.tuneles[i].usada = true;
                    var j = this.tuneles.findIndex(p =>
                        p.tipo === this.tuneles[i].tipo
                        && p.origenX === this.tuneles[i].destinoX
                        && p.origenY === this.tuneles[i].destinoY);
                    this.tuneles[j].usada = true;
                    if(this.jugador.x > this.tuneles[i].destinoX){
                        this.usadoTunelDerecha = true;
                    }else{
                        this.usadoTunelIzquierda = true;
                    }
                    this.jugador.x = this.tuneles[i].destinoX;
                    this.jugador.y = this.tuneles[i].destinoY;
                }
            }else{
                this.tuneles[i].usada = false;
            }
        }

        //HUD actualizacion
        this.textoVidas.valor = this.jugador.vidas;
        this.textoMinasRestantes.valor = this.jugador.minas;
        this.textoEnemigosRestantes.valor = this.enemigosRestantes;

        this.espacio.actualizar();
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
                this.enemigosRestantes--;
                break;
            case "M":
                var enemigoMedio = new EnemigoMedio(x,y);
                enemigoMedio.y = enemigoMedio.y - enemigoMedio.alto / 2;
                this.enemigos.push(enemigoMedio);
                this.espacio.agregarCuerpoDinamico(enemigoMedio);
                this.enemigosRestantes--;
                break;
            case "F":
                var enemigoFuerte = new EnemigoFuerte(x,y);
                enemigoFuerte.y = enemigoFuerte.y - enemigoFuerte.alto / 2;
                this.enemigos.push(enemigoFuerte);
                this.espacio.agregarCuerpoDinamico(enemigoFuerte);
                this.enemigosRestantes--;
                break;
            case "J":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_destruible, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
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
            case "4":
                var bloque = new Bloque(imagenes.bloque_limite, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                this.bloquesLimite.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "T":
                var tunel = new Tunel(imagenes.tunel, x, y, 9);
                tunel.y = tunel.y - tunel.alto / 2;
                tunel.origenY = tunel.origenY - tunel.alto / 2;
                var tunelGemelo = this.tuneles.find(p => p.tipo === 9);
                if (tunelGemelo != undefined) {
                    var i = this.tuneles.findIndex(p => p.tipo === 9);
                    this.tuneles[i].destinoX = tunel.origenX;
                    this.tuneles[i].destinoY = tunel.origenY;
                    tunel.destinoX = tunelGemelo.origenX;
                    tunel.destinoY = tunelGemelo.origenY;
                }
                this.tuneles.push(tunel);
                this.espacio.agregarCuerpoEstatico(tunel);
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
        if(this.usadoTunelIzquierda){
            this.scrollX = 285;
            this.usadoTunelIzquierda = false;
        }else if(this.usadoTunelDerecha){
            this.scrollX = 2;
            this.usadoTunelDerecha = false;
        }
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
        for (var i = 0; i < this.bloquesLimite.length; i++) {
            this.bloquesLimite[i].dibujar(this.scrollX, this.scrollY);
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
        for(var i = 0; i < this.consumiblePropulsion.length; i++){
            this.consumiblePropulsion[i].dibujar(this.scrollX, this.scrollY);
        }
        for(var i = 0; i < this.consumibleInvulnerabilidad.length; i++){
            this.consumibleInvulnerabilidad[i].dibujar(this.scrollX, this.scrollY);
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
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
        }
        this.jugador.dibujar(this.scrollX, this.scrollY);

        for(var i = 0; i < this.tuneles.length; i++){
            this.tuneles[i].dibujar(this.scrollX, this.scrollY);
        }

        // HUD
        this.fondoEnemigosRestantes.dibujar();
        this.textoEnemigosRestantes.dibujar();
        this.fondoVidas.dibujar();
        this.textoVidas.dibujar();
        this.fondoMinasRestantes.dibujar();
        this.textoMinasRestantes.dibujar();
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
        //activar propulsion jugador
        if(controles.activarPropulsion){
            this.jugador.activarPropulsion();
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