const newEvent = {
    temporizadores: [
        {
            idTemporizador: 0,
            inicio: "2023-01-06T15:16:22.159Z",
            idCategoria: 0,
            pausa: true,
        },
        {
            idTemporizador: 1,
            inicio: "2023-01-06T14:16:22.159Z",
            idCategoria: 0,
            pausa: true,
        },
        {
            idTemporizador: 2,
            inicio: "2023-01-06T14:16:22.159Z",
            idCategoria: 0,
            pausa: true,
        },
    ],
    tiemposEmpresasSalas: [
        {
            id: 0,
            idTimer: 0,
            idEmpresa: 0,
            idSala: 0,
            idEvento: 0,
        },
        {
            id: 0,
            idTimer: 1,
            idEmpresa: 0,
            idSala: 0,
            idEvento: 0,
        },
        {
            id: 0,
            idTimer: 2,
            idEmpresa: 0,
            idSala: 0,
            idEvento: 0,
        },
    ],
};

const eventOriginal = {
    temporizadores: [
        {
            idTemporizador: 0,
            inicio: "2023-01-06T14:16:22.159Z",
            idCategoria: 0,
            pausa: true,
        },
    ],
    tiemposEmpresasSalas: [
        {
            id: 0,
            idTimer: 0,
            idEmpresa: 0,
            idSala: 0,
            idEvento: 0,
        },
    ],
};

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
