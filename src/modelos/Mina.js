class Mina extends Modelo{
    constructor(x, y) {
        super(imagenes.mina, x, y);
        this.tiempoActivacion = 80;
        this.activa = false;
    }

    actualizar(){
        this.tiempoActivacion--;
        if(this.tiempoActivacion == 0){
            this.activa = true;
        }
    }
}