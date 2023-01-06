// React
import { useState, useEffect } from "react";
// Context
import { useAuthContext } from "../contexts/authContext";
// Components
import AddButton from "./AddButton";
// Styles
import style from "./InsTiempoEmpresaSala.module.css";

import EmpresaSala from "./EmpresaSala";

function InsTiempoEmpresaSala(props) {
    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();

    const [empresas, setEmpresas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tiempoInicial, setTiempoInicial] = useState([]);

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
    }, [salas]);

    useEffect(() => {
        console.log(props);
        if (
            props.tiempoinicial != "Invalid Date" &&
            props.tiempoinicial != ""
        ) {
            console.log(props.tiempoInicial);
            var tiempo = props.tiempoinicial.toLocaleTimeString().split(":");
            if (parseInt(tiempo[0]) < 10) {
                tiempo[0] = "0" + tiempo[0];
            }
            setTiempoInicial(tiempo[0] + ":" + tiempo[1]);
        } else {
            setTiempoInicial("Sin hora");
        }
    }, [props]);

    useEffect(() => {
        console.log(tiempoInicial);
        if (
            tiempoInicial != "Invalid Date" &&
            tiempoInicial != "" &&
            tiempoInicial != "Sin hora"
        ) {
            ajustaTiempo();
        }
    }, [tiempoInicial]);

    //FUNCION PARA AJUSTAR EL TIEMPO SI SE PRODUCE CAMBIO EN SELECT DE CATEGORIAS O EN HORA INICIAL

    function ajustaTiempo() {
        var tbodyTimer =
            document.getElementById("timer-table").childNodes[1].childNodes;
        var hora = tiempoInicial.split(":");
        hora[0] = parseInt(hora[0]);
        hora[1] = parseInt(hora[1]);
        var arrayHoras = [];

        if (tbodyTimer.length > 1) {
            //CAMBIO DE HORAS EN LA TABLA DE TIMER

            for (var i = 0; i < tbodyTimer.length; i++) {
                var horaCelda = tbodyTimer[i].childNodes[0];
                var duracion = parseInt(
                    tbodyTimer[i].childNodes[1].childNodes[0].selectedOptions[0]
                        .value
                );

                if (i == 0) {
                    hora[1] = hora[1] + duracion;
                } else {
                    if (hora[1] < 10 && hora[0] < 10) {
                        horaCelda.innerText = "0" + hora[0] + ":0" + hora[1];
                        arrayHoras.push("0" + hora[0] + ":0" + hora[1]);
                    } else if (hora[1] < 10 && hora[0] >= 10) {
                        horaCelda.innerText = hora[0] + ":0" + hora[1];
                        arrayHoras.push(hora[0] + ":0" + hora[1]);
                    } else if (hora[1] >= 10 && hora[0] < 10) {
                        horaCelda.innerText = "0" + hora[0] + ":" + hora[1];
                        arrayHoras.push("0" + hora[0] + ":" + hora[1]);
                    } else {
                        horaCelda.innerText = hora[0] + ":" + hora[1];
                        arrayHoras.push(hora[0] + ":" + hora[1]);
                    }

                    hora[1] = hora[1] + duracion;
                }

                console.log(props);

                if (hora[1] >= 60) {
                    hora[0]++;
                    hora[1] = hora[1] - 60;
                }

                if (hora[0] >= 24) {
                    hora[0] = hora[0] - 24;
                }
            }

            //CAMBIO DE HORAS EN LA TABLAS DE CADA SALA

            var tablasSala = document.getElementsByClassName("div-table-room");

            for (var i = 0; i < tablasSala.length; i++) {
                var tbodySala =
                    tablasSala[i].childNodes[0].childNodes[1].childNodes;

                for (var j = 0; j < tbodySala.length; j++) {
                    if (j != 0) {
                        tbodySala[j].childNodes[0].innerText =
                            arrayHoras[j - 1];
                    }
                }
            }
        }
    }

    //FUNCION PARA CAMBIAR LA TABLA DE CADA SALA
    function cambiaTablaSala() {
        if (salas != []) {
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
    }

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
            celdaTiempo.classList.add("fw-bold");
            celdaTiempo.innerText = hora[0] + ":" + hora[1];

            var celdaSelect = document.createElement("td");

            var selector = document.createElement("select");
            selector.classList.add(style.tableSelect);
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
            console.log("Inserta hora de inicio");
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

            var selector = document.createElement("select");

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
            tbodyTimer[tbodyTimer.length - 1].remove();

            var tablasSala = document.getElementsByClassName("div-table-room");

            for (var i = 0; i < tablasSala.length; i++) {
                var tbodySala =
                    tablasSala[i].childNodes[0].childNodes[1].childNodes;
                tbodySala[tbodySala.length - 1].remove();
            }
        }
    }

    return (
        <div>
            <table
                className="table table-bordered table-striped text-center"
                id="timer-table"
            >
                <thead className={style.tableHead}>
                    <tr>
                        <th>INICIO</th>
                        <th>CATEGORIA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="fw-bold">{tiempoInicial}</td>
                        <td>
                            <select
                                onChange={ajustaTiempo}
                                className={style.tableSelect}
                            >
                                {categorias.map((categoria, index) => {
                                    return (
                                        <option value={categoria.duracion}>
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
                </tbody>
            </table>
            <div className={style.tableButtons}>
                <button onClick={eliminaFila}>Eliminar Ultimo Tiempo</button>
                <AddButton clickHandler={aniadeFilaTimer} />
            </div>

            <div>
                <h6>Salas</h6>
                <select
                    className="my-3"
                    id="select-room"
                    onChange={() => cambiaTablaSala()}
                    style={{
                        width: "100%",
                        textAlign: "center",
                        outline: "none",
                        padding: "7px",
                        borderRadius: "100px",
                    }}
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
                    />
                );
            })}
        </div>
    );
}
export default InsTiempoEmpresaSala;
