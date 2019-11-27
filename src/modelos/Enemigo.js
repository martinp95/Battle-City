class Enemigo extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_parado_izquierda, imagenes.enemigo_idle_arriba,
            imagenes.enemigo_idle_abajo, imagenes.enemigo_idle_izquierda,
            imagenes.enemigo_idle_derecha, x, y);
    }

}
