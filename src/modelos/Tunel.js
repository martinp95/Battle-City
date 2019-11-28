class Tunel extends Bloque{
    constructor(rutaImagen, x, y){
        super(rutaImagen, x, y);
        this.origenX = x;
        this.origenY = y;
        this.destinoX = 0;
        this.destinoY = 0;
        this.usada = false;
    }
}