// React
import { useState, useEffect, useCallback } from "react";
// Context
import { useAuthContext } from "../contexts/authContext";
// Components
import EmpresaSala from "./EmpresaSala";
// Styles
import "./InsTiempoEmpresaSala.css";
// React notifications
import { toast } from "react-toastify";

function InsTiempoEmpresaSala({
    primerTiempo,
    tiemposEventosFiltered,
    cleanedArrayTimers,
}) {
    const { adminSocket } = useAuthContext();

    const [empresas, setEmpresas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tiempoInicial, setTiempoInicial] = useState([]);

    //FUNCION PARA AJUSTAR EL TIEMPO SI SE PRODUCE CAMBIO EN SELECT DE CATEGORIAS O EN HORA INICIAL

    const ajustaTiempo = useCallback(() => {
        if (typeof tiempoInicial === "string") {
            var tbodyTimer =
                document.getElementById("timer-table").childNodes[1].childNodes;
            var hora = tiempoInicial.split(":");
            hora[0] = parseInt(hora[0]);
            hora[1] = parseInt(hora[1]);
            var arrayHoras = [];

            if (tbodyTimer.length > 0) {
                //CAMBIO DE HORAS EN LA TABLA DE TIMER

                for (let i = 0; i < tbodyTimer.length; i++) {
                    if (
                        tbodyTimer[i].childNodes[1].childNodes[0]
                            .selectedOptions[0]
                    ) {
                        var horaCelda = tbodyTimer[i].childNodes[0];
                        var duracion = parseInt(
                            tbodyTimer[i].childNodes[1].childNodes[0]
                                .selectedOptions[0].value
                        );

                        if (i === 0) {
                            hora[1] = hora[1] + duracion;
                        } else {
                            if (hora[1] < 10 && hora[0] < 10) {
                                horaCelda.innerText =
                                    "0" + hora[0] + ":0" + hora[1];
                                arrayHoras.push("0" + hora[0] + ":0" + hora[1]);
                            } else if (hora[1] < 10 && hora[0] >= 10) {
                                horaCelda.innerText = hora[0] + ":0" + hora[1];
                                arrayHoras.push(hora[0] + ":0" + hora[1]);
                            } else if (hora[1] >= 10 && hora[0] < 10) {
                                horaCelda.innerText =
                                    "0" + hora[0] + ":" + hora[1];
                                arrayHoras.push("0" + hora[0] + ":" + hora[1]);
                            } else {
                                horaCelda.innerText = hora[0] + ":" + hora[1];
                                arrayHoras.push(hora[0] + ":" + hora[1]);
                            }

                            hora[1] = hora[1] + duracion;
                        }

                        if (hora[1] >= 60) {
                            hora[0]++;
                            hora[1] = hora[1] - 60;
                        }

                        if (hora[0] >= 24) {
                            hora[0] = hora[0] - 24;
                        }
                    }

                    //CAMBIO DE HORAS EN LA TABLAS DE CADA SALA

                    var tablasSala =
                        document.getElementsByClassName("div-table-room");

                    for (let i = 0; i < tablasSala.length; i++) {
                        var tbodySala =
                            tablasSala[i].childNodes[0].childNodes[1]
                                .childNodes;

                        for (var j = 0; j < tbodySala.length; j++) {
                            if (j !== 0) {
                                tbodySala[j].childNodes[0].innerText =
                                    arrayHoras[j - 1];
                            }
                        }
                    }
                }
            }
        }
    }, [tiempoInicial]);

    //FUNCION PARA CAMBIAR LA TABLA DE CADA SALA

    const cambiaTablaSala = useCallback(() => {
        if (salas !== []) {
            var nomSala =
                document.getElementById("select-room").selectedOptions[0]
                    .innerText;
            var tablasSala = document.getElementsByClassName("div-table-room");

            for (var i = 0; i < tablasSala.length; i++) {
                if (tablasSala[i].classList.contains("room-" + nomSala)) {
                    tablasSala[i].style.display = "block";
                } else {
                    tablasSala[i].style.display = "none";
                }
            }
        }
    }, [salas]);

    //FUNCION PARA AÑADIR FILA AL TIMER

    function aniadeFilaTimer() {
        if (
            tiempoInicial !== "Invalid Date" &&
            tiempoInicial !== "" &&
            tiempoInicial !== "Sin hora"
        ) {
            var tbody = document.getElementById("timer-table").childNodes[1];
            var hora =
                tbody.childNodes[
                    tbody.childNodes.length - 1
                ].childNodes[0].innerText.split(":");

            hora[0] = parseInt(hora[0]);
            hora[1] = parseInt(hora[1]);

            var valorCategoria =
                tbody.childNodes[tbody.childNodes.length - 1].childNodes[1]
                    .childNodes[0].selectedOptions[0].value;

            hora[1] = hora[1] + parseInt(valorCategoria);

            if (hora[1] >= 60) {
                hora[0]++;
                hora[1] = hora[1] - 60;
            }

            if (hora[1] < 10) {
                hora[1] = "0" + hora[1];
            }

            if (hora[0] < 10) {
                hora[0] = "0" + hora[0];
            }

            if (hora[0] >= 24) {
                hora[0] = hora[0] - 24;
                if (hora[0] < 10) {
                    hora[0] = "0" + hora[0];
                }
            }

            var fila = document.createElement("tr");

            var celdaTiempo = document.createElement("td");
            celdaTiempo.classList.add("hora");
            celdaTiempo.innerText = hora[0] + ":" + hora[1];

            var celdaSelect = document.createElement("td");

            var selector = document.createElement("select");
            selector.classList.add("select-category");
            selector.addEventListener("change", ajustaTiempo);

            for (var i = 0; i < categorias.length; i++) {
                var opcion = document.createElement("option");
                opcion.value = categorias[i].duracion;
                opcion.innerText =
                    categorias[i].categoria +
                    " - " +
                    categorias[i].duracion +
                    " min";
                selector.append(opcion);
            }

            celdaSelect.append(selector);
            fila.append(celdaTiempo);
            fila.append(celdaSelect);
            tbody.append(fila);

            aniadeFilaSalas(celdaTiempo.innerText);
        } else {
            toast.warn("Inserta hora de inicio", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    //FUNCION PARA AÑADIR FILA DE LA HORA
    function aniadeFilaSalas(hora) {
        var tablasSala = document.getElementsByClassName("div-table-room");

        for (var i = 0; i < tablasSala.length; i++) {
            var tbody = tablasSala[i].childNodes[0].childNodes[1];
            var fila = document.createElement("tr");

            var celdaTiempo = document.createElement("td");
            celdaTiempo.classList.add("hora");
            celdaTiempo.innerText = hora;

            var celdaSelect = document.createElement("td");

            let selector = document.createElement("select");
            selector.classList.add("select-room");

            empresas.forEach((empresa) => {
                var opcion = document.createElement("option");
                opcion.value = empresa.idEmpresa;
                opcion.innerText = empresa.nombreEmpresa;
                selector.append(opcion);
            });

            celdaSelect.append(selector);
            fila.append(celdaTiempo);
            fila.append(celdaSelect);
            tbody.append(fila);
        }
    }

    function eliminaFila() {
        var tbodyTimer =
            document.getElementById("timer-table").childNodes[1].childNodes;

        if (tbodyTimer.length > 1) {
            if (adminSocket) {
                adminSocket.emit(
                    "delete tiempo_empresa_sala",
                    "empresa X",
                    (res) => {
                        console.log(res);
                    }
                );

                tbodyTimer[tbodyTimer.length - 1].remove();

                var tablasSala =
                    document.getElementsByClassName("div-table-room");

                for (var i = 0; i < tablasSala.length; i++) {
                    var tbodySala =
                        tablasSala[i].childNodes[0].childNodes[1].childNodes;
                    tbodySala[tbodySala.length - 1].remove();
                }
            }
        } else {
            toast.warn("Debe de haber al menos un timer", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    //USE EFFECT DE LOS SOCKETS

    useEffect(() => {
        if (adminSocket) {
            adminSocket.emit("categorias", (categorias) => {
                if (categorias) {
                    setCategorias(categorias);
                } else {
                    console.log("error getting categorias");
                }
            });
            adminSocket.emit("salas", (salas) => {
                if (salas) {
                    setSalas(salas);
                } else {
                    console.log("error getting salas");
                }
            });
            adminSocket.emit("empresas", (empresas) => {
                if (empresas) {
                    setEmpresas(empresas);
                } else {
                    console.log("error getting empresas");
                }
            });
        }
    }, [adminSocket]);

    //USE EFFECTS PARA CADA ELEMENTO NECESARIO

    useEffect(() => {
        var tablasSala = document.getElementsByClassName("div-table-room");
        if (tablasSala.length > 0) {
            cambiaTablaSala();
        }
    }, [salas, cambiaTablaSala]);

    useEffect(() => {
        if (
            primerTiempo !== "Invalid Date" &&
            primerTiempo !== "Inval" &&
            primerTiempo !== ""
        ) {
            let tiempo = primerTiempo.toLocaleTimeString().split(":");
            if (parseInt(tiempo[0]) < 10) {
                tiempo[0] = "0" + tiempo[0];
                if (cleanedArrayTimers && cleanedArrayTimers.length > 0) {
                    setTiempoInicial(
                        new Date(cleanedArrayTimers[0].inicioTimer)
                            .toTimeString()
                            .substring(0, 5)
                    );
                }
            }
            setTiempoInicial(tiempo[0] + ":" + tiempo[1]);
        } else {
        }
    }, [primerTiempo, cleanedArrayTimers]);

    useEffect(() => {
        if (
            primerTiempo !== "Invalid Date" &&
            primerTiempo !== "Inval" &&
            primerTiempo !== "" &&
            primerTiempo !== "Sin hora"
        ) {
            ajustaTiempo();
        }
    }, [primerTiempo, ajustaTiempo]);

    return (
        <>
            <table className="tabla-tes" id="timer-table" width="100%">
                <thead>
                    <tr>
                        <th className="detail-card-title">INICIO</th>
                        <th className="detail-card-title">CATEGORIA</th>
                    </tr>
                </thead>
                <tbody>
                    {cleanedArrayTimers.map((tiempoEvento) => (
                        <tr>
                            <td className="hora">{tiempoInicial}</td>
                            <td>
                                <select
                                    onChange={ajustaTiempo}
                                    className="select-category"
                                >
                                    {categorias.map((categoria, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={categoria.duracion}
                                                idCategoria={
                                                    categoria.idCategoria
                                                }
                                                selected={
                                                    tiempoEvento.idCategoria ===
                                                    categoria.idCategoria
                                                }
                                            >
                                                {categoria.categoria +
                                                    " - " +
                                                    categoria.duracion +
                                                    " min"}
                                            </option>
                                        );
                                    })}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex">
                <button
                    className="btn btn-sm btn-outline-danger rounded-0 w-50"
                    onClick={eliminaFila}
                    title="Eliminar último timer"
                >
                    -
                </button>
                <button
                    className="btn btn-sm btn-outline-success rounded-0 w-50"
                    onClick={aniadeFilaTimer}
                    title="Añadir timer"
                >
                    +
                </button>
            </div>
            <div className="mt-4">
                <h6 className="text-center main-card-title">SALAS</h6>
                <select
                    className="form-control text-center rounded-0 border-bottom-0"
                    id="select-room"
                    onChange={() => cambiaTablaSala()}
                >
                    {salas.map((sala, index) => {
                        return (
                            <option key={index} value={sala.idSala}>
                                {sala.nombreSala}
                            </option>
                        );
                    })}
                </select>
            </div>
            {salas.map((sala, index) => {
                return (
                    <EmpresaSala
                        key={index}
                        sala={sala}
                        tiempoInicial={tiempoInicial}
                        empresas={empresas}
                        tiemposEventosFiltered={tiemposEventosFiltered}
                        primerTiempo={primerTiempo}
                    />
                );
            })}
        </>
    );
}
export default InsTiempoEmpresaSala;
