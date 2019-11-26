class ConsumibleMina extends Bloque{
    constructor(x, y){
        super(imagenes.consumible_mina, x, y);
        this.tiempoVida = 3000;
    }
}