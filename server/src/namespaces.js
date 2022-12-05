class NameSpaces {
    mainNsp;
    nsp1;
    nsp2;

    constructor(io) {
        this.mainNsp = io.of("/main"); // the "nsp1" namespace
        this.nsp1 = io.of("/nsp1"); // the "nsp1" namespace
        this.nsp2 = io.of("/nsp2"); // the "nsp2" namespace
    }

    static get namespaces() {
        return {
            mainNsp: this.mainNsp,
            nsp1: this.nsp1,
            nsp2: this.nsp2,
        };
    }
}

module.exports.NameSpaces = NameSpaces;
