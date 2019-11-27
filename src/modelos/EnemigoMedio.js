class EnemigoMedio extends EnemigoBase {

    constructor(x,y){
        super(imagenes.enemigo_medio_parado_arriba, imagenes.enemigo_medio_idle_arriba,
            imagenes.enemigo_medio_idle_abajo, imagenes.enemigo_medio_idle_izquierda,
            imagenes.enemigo_medio_idle_derecha, x, y);
        this.vidas = 3;
    }

}