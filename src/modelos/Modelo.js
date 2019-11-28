class Modelo {

    constructor(imagenRuta, x, y) {
        this.imagen = new Image();
        this.imagen.src = imagenRuta;
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        contexto.drawImage(this.imagen,
            this.x - this.ancho /2 - scrollX,
            this.y - this.alto /2 - scrollY);
    }

    colisiona (modelo){
        var colisiona = false;
        if ( modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y + this.alto/2 >= modelo.y - modelo.alto/2
            && this.y - this.alto/2 <= modelo.y + modelo.alto/2 ){

            colisiona = true;
        }
        return colisiona;
    }

    colisionaDetras(modelo){
        //no funciona, revisar
        if (modelo.orientacion == orientaciones.arriba
            && modelo.x - modelo.ancho / 2 <= this.x + this.ancho / 2
            && modelo.x + modelo.ancho / 2 >= this.x - this.ancho / 2
            && this.y - this.alto/2 >= modelo.y + modelo.alto/2){
            return true;
        }
        //no funciona, revisar
        if (modelo.orientacion == orientaciones.abajo
            && modelo.x - modelo.ancho / 2 <= this.x + this.ancho / 2
            && modelo.x + modelo.ancho / 2 >= this.x - this.ancho / 2
            && this.y + this.alto / 2 == modelo.y - modelo.alto / 2){
            return true;
        }
        //funciona
        if (modelo.orientacion == orientaciones.izquierda
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y - this.alto/2 <= modelo.y + modelo.alto/2
            && this.y + this.alto/2 >= modelo.y - modelo.alto/2 ){
            return true;
        }
        //No funciona, revisar
        if (modelo. orientacion == orientaciones.derecha
            && modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && this.y + this.alto/2 <= modelo.y - modelo.alto/2
            && this.y - this.alto/2 >= modelo.y + modelo.alto/2 ){
            return true;
        }
        return false;
    }

    estaEnPantalla (){
        if ( (this.x - gameLayer.scrollX) - this.ancho/2 <= 480 &&
            (this.x - gameLayer.scrollX) + this.ancho/2 >= 0 &&
            (this.y - gameLayer.scrollY)  - this.alto/2 <= 320 &&
            (this.y - gameLayer.scrollY) + this.alto/2 >= 0 ){
            return true;
        }
        return false;
    }
}