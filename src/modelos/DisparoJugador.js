class DisparoJugador extends Modelo {

    constructor(imagen, x, y, vertical) {
        super(imagen, x, y);
        if (!vertical) {
            this.vx = 9;
            this.vy = 0;
        }else {
            this.vx = 0;
            this.vy = 9;
        }
    }

    actualizar (){
    }
}
