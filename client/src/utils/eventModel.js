export default class Event {
    #temporizadores = [];
    #tiemposEmpresasSalas = [];

    constructor(temporizadores, tiemposEmpresasSalas) {
        this.#temporizadores = temporizadores;
        this.#tiemposEmpresasSalas = tiemposEmpresasSalas;
    }
    addTemporizador(newTemporizador) {
        this.#temporizadores = this.#temporizadores.push(newTemporizador);
    }
    deleteTemporizador(idTemporizador) {
        this.#temporizadores.filter(
            (temporizador) => temporizador.idTemporizador !== idTemporizador
        );
    }
    addTiemposEmpresasSalas(newTiempoEmpresaSala) {
        this.#tiemposEmpresasSalas.push(newTiempoEmpresaSala);
    }
    deleteTiemposEmpresasSalasByTimer(idTemporizador) {
        this.#tiemposEmpresasSalas = this.#tiemposEmpresasSalas.filter(
            (tiemposEmpresasSala) =>
                tiemposEmpresasSala.idTimer !== idTemporizador
        );
    }
}
