class DisparoEnemigo extends Modelo {

    constructor(imagen, x, y) {
        super(imagen, x, y);
        this.vx = 9;
    }

    actualizar() {
        this.x = this.x + this.vx;
    }
}