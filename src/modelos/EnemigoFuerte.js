class EnemigoFuerte extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_fuerte_parado_abajo, imagenes.enemigo_fuerte_idle_arriba,
            imagenes.enemigo_fuerte_idle_abajo, imagenes.enemigo_fuerte_idle_izquierda,
            imagenes.enemigo_fuerte_idle_derecha, x, y);
        this.cadenciaDisparo = 50;
    }

}