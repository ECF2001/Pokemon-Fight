class TablaLiderazgo {
    constructor() {
        this.Filas = [];
    }
    agregarFila (fila) {
        this.Filas.push(fila)
    }
}
let tabla = new TablaLiderazgo();
tabla = agregarFila(fila)

class datosUsuarioFila {
    constructor() {
        this.identificacion = "";
        this.nombreUsuario = "";
        this.foto = "";
        this.victorias = "";
        this.fotoPokemon = "";
    }
    constructor(identificacion,nombreUsuario,foto,victorias,fotoPokemon) {
        this.identificacion = identificacion;
        this.nombreUsuario = nombreUsuario;
        this.foto = foto;
        this.victorias = victorias;
        this.fotoPokemon = fotoPokemon;
    }
}
let fila = new datosUsuarioFila();