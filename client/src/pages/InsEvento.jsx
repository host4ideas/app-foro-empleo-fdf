// React
import { useState } from "react";
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

function InsEvento() {
    const [fechas, setFechas] = useState({ fechaInicio: ""});
    const [totalHora, setTotalHora] = useState("00:00");

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
                <h6 className="main-card-title main-card-title-left mb-1">
                    NOMBRE DEL EVENTO
                </h6>
                <div>
                    <input className="form-control" type="text" required />
                </div>
            </div>
            <div className="company-room-show">
                <div className="room-show">
                    <NavLink
                        className="detail-card-title black-link"
                        to={"/" + PRIVATE + "/" + INSSALAS}
                    >
                        SALAS{" "}
                        <span className="text-secondary"> - (0 salas)</span>
                    </NavLink>
                </div>
                <div className="company-show">
                    <NavLink
                        className="detail-card-title black-link"
                        to={"/" + PRIVATE + "/" + INSEMPRESA}
                    >
                        EMPRESAS{" "}
                        <span className="text-secondary"> - (0 empresas)</span>
                    </NavLink>
                </div>
                <div className="company-show">
                    <NavLink
                        className="detail-card-title black-link"
                        to={"/" + PRIVATE + "/" + INSCATEGORIA}
                    >
                        CATEGORIAS TEMPORIZADORES{" "}
                        <span className="text-secondary"> - (0 empresas)</span>
                    </NavLink>
                </div>
            </div>
            <div className="organization-zone">
                <h6 className="my-2 text-center main-card-title main-card-title-left">
                    ORGANIZACION
                </h6>
                <InsTiempoEmpresaSala tiempoinicial={fechas.fechaInicio}/>
                {/*<InsTiempoEmpresaSala tiempoinicial='valorinputhorainicio' categorias='stateCategorias'/>*/}
            </div>
            <div>
                <BackButton path={"/"} />
                <button className="btn btn-primary">CREAR</button>
            </div>
        </div>
    );
}
export default InsEvento;
