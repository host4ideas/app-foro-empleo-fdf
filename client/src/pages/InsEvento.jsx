// React
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// Components
import InsCategoria from "./InsCategoria";
import InsTiempoEmpresaSala from "../components/InsTiempoEmpresaSala";
import BackButton from "../components/BackButton";
// Icons
import { GoArrowLeft } from "react-icons/go";
// Styles
import "./InsEvento.css";
// Routes
import { INSCATEGORIA, INSEMPRESA, INSSALAS, PRIVATE } from "../utils/paths";
import { useAuthContext } from "../contexts/authContext";

function InsEvento() {
    const { adminSocket } = useAuthContext();
    const [fechas, setFechas] = useState({ fechaInicio: "" });
    const [longEmp, setLongEmp] = useState(0);
    const [longSal, setLongSal] = useState(0);
    const [longCat, setLongCat] = useState(0);

    useEffect(() => {
        if (adminSocket) {
            adminSocket.emit("categorias", (categorias) => {
                if (categorias) {
                    setLongCat(categorias.length);
                } else {
                    console.log("error getting categorias");
                }
            });
            adminSocket.emit("salas", (salas) => {
                if (salas) {
                    setLongSal(salas.length);
                } else {
                    console.log("error getting salas");
                }
            });
            adminSocket.emit("empresas", (empresas) => {
                if (empresas) {
                    setLongEmp(empresas.length);
                } else {
                    console.log("error getting empresas");
                }
            });
        }
    }, [adminSocket]);

    function cambiaHoraTotal() {
        var fechaInicioInput = document
            .getElementById("fechaI")
            .value.split("-", 3);
        var horaInicioInput = document
            .getElementById("horaI")
            .value.split(":", 2);

        var fechaState = {
            fechaInicio: new Date(
                fechaInicioInput[0],
                fechaInicioInput[1],
                fechaInicioInput[2],
                horaInicioInput[0],
                horaInicioInput[1]
            ),
        };

        setFechas(fechaState);
    }

    return (
        <div className="div-events text-center">
            <div className="hour-zone text-center">
                <div className="start-hour">
                    <h6 className="main-card-title my-2">Inicio</h6>
                    <input id="fechaI" onChange={cambiaHoraTotal} type="date" />
                    <input id="horaI" onChange={cambiaHoraTotal} type="time" />
                </div>
            </div>
            <div className="event-name">
                <h6 className="main-card-title">NOMBRE DEL EVENTO</h6>
                <input
                    className="form-control rounded-0"
                    type="text"
                    required
                />
            </div>
            <div className="company-room-show">
                <div className="room-show">
                    <NavLink
                        className="detail-card-title black-link"
                        to={"/" + PRIVATE + "/" + INSSALAS}
                    >
                        SALAS{" "}
                        <span className="text-secondary">
                            {" "}
                            - ({longSal} salas)
                        </span>
                    </NavLink>
                </div>
                <div className="company-show">
                    <NavLink
                        className="detail-card-title black-link"
                        to={"/" + PRIVATE + "/" + INSEMPRESA}
                    >
                        EMPRESAS{" "}
                        <span className="text-secondary">
                            {" "}
                            - ({longEmp} empresas)
                        </span>
                    </NavLink>
                </div>
                <div className="company-show">
                    <NavLink
                        className="detail-card-title black-link"
                        to={"/" + PRIVATE + "/" + INSCATEGORIA}
                    >
                        CATEGORÍAS{" "}
                        <span className="text-secondary">
                            {" "}
                            - ({longCat} categorias)
                        </span>
                    </NavLink>
                </div>
            </div>
            <div className="organization-zone">
                <h6 className="text-center main-card-title">ORGANIZACIÓN</h6>
                <InsTiempoEmpresaSala tiempoinicial={fechas.fechaInicio} />
                {/*<InsTiempoEmpresaSala tiempoinicial='valorinputhorainicio' categorias='stateCategorias'/>*/}
            </div>
            <div>
                <BackButton path={"/"} />
                <button className="btn btn-primary">ACTUALIZAR</button>
            </div>
        </div>
    );
}
export default InsEvento;
