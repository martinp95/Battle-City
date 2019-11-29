class Tunel extends Bloque{
    constructor(rutaImagen, x, y, tipo){
        super(rutaImagen, x, y);
        this.origenX = x;
        this.origenY = y;
        this.destinoX = 0;
        this.destinoY = 0;
        this.tipo = tipo;
        this.usada = false;
    }
}