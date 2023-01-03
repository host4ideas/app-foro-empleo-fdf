import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./InsTiempoEmpresaSala.css";
import { useAuthContext } from "../contexts/authContext";

function InsTiempoEmpresaSala() {
    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();

    const [empresas, setEmpresas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        if (adminSocket) {
            adminSocket.emit("categorias", (categorias) => {
                if (categorias) {
                    setCategorias(categorias);
                    console.log(categorias);
                } else {
                    console.log("error getting categorias");
                }
            });
            adminSocket.emit("salas", (salas) => {
                if (salas) {
                    setSalas(salas);
                    console.log(salas);
                } else {
                    console.log("error getting salas");
                }
            });
            adminSocket.emit("empresas", (empresas) => {
                if (empresas) {
                    setEmpresas(empresas);
                    console.log(empresas);
                } else {
                    console.log("error getting empresas");
                }
            });
        }
    }, [adminSocket]);

    function cambiaTablaSala() {
        var nomSala =
            document.getElementById("select-room").selectedOptions[0].innerText;
        var tablasSala = document.getElementsByClassName("div-table-room");

        for (var i = 0; i < tablasSala.length; i++) {
            if (tablasSala[i].classList.contains("room-" + nomSala)) {
                tablasSala[i].style.display = "block";
            } else {
                tablasSala[i].style.display = "none";
            }
        }
    }

    function aniadeFilaTimer() {
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

        var fila = document.createElement("tr");

        var celdaTiempo = document.createElement("td");
        celdaTiempo.classList.add("hora");
        celdaTiempo.innerText = hora[0] + ":" + hora[1];

        var celdaSelect = document.createElement("td");

        var selector = document.createElement("select");
        selector.classList.add("select-category");

        for (var i = 0; i < categorias.length; i++) {
            var opcion = document.createElement("option");
            opcion.value = categorias[i].duracion;
            opcion.innerText = categorias[i].categoria;
            selector.append(opcion);
        }

        celdaSelect.append(selector);
        fila.append(celdaTiempo);
        fila.append(celdaSelect);
        tbody.append(fila);

        aniadeFilaSalas(celdaTiempo.innerText);
    }

    function aniadeFilaSalas(hora) {
        var tablasSala = document.getElementsByClassName("div-table-room");

        for (var i = 0; i < tablasSala.length; i++) {
            var tbody = tablasSala[i].childNodes[0].childNodes[1];
            console.log(tbody);
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

    return (
        <div style={{ marginTop: "10px" }}>
            <table className="tabla-tes" id="timer-table" width="100%">
                <thead>
                    <tr>
                        <th className="detail-card-title">INICIO</th>
                        <th className="detail-card-title">CATEGORIA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="hora">9:00</td>
                        <td>
                            <select className="select-category">
                                {categorias.map((categoria, index) => {
                                    return (
                                        <option value={categoria.duracion}>
                                            {categoria.categoria}
                                        </option>
                                    );
                                })}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
                className="extra-tes"
                type="submit"
                onClick={() => aniadeFilaTimer()}
            >
                <AiOutlinePlus />
            </button>
            <div style={{ width: "100%", margin: "15px 0px 15px 0px" }}>
                <select
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
                    <div
                        key={index}
                        className={"div-table-room room-" + sala.nombreSala}
                    >
                        <table className={"tabla-tes"} width="100%">
                            <thead>
                                <tr>
                                    <th>INICIO</th>
                                    <th>EMPRESA {sala.nombreSala}</th>
                                </tr>
                            </thead>
                            <tbody className={"tbody-" + sala.nombreSala}>
                                <tr>
                                    <td className="hora">9:00</td>
                                    <td>
                                        <select className="select-room">
                                            {empresas.map((empresa, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={
                                                            empresa.idEmpresa
                                                        }
                                                    >
                                                        {empresa.nombreEmpresa}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}
export default InsTiempoEmpresaSala;
