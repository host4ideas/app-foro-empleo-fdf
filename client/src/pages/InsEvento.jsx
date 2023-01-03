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
    const [fechas, setFechas] = useState({ fechaInicio: "", fechaFin: "" });
    const [totalHora, setTotalHora] = useState("00:00");

    function cambiaHoraTotal() {
        var fechaInicioInput = document
            .getElementById("fechaI")
            .value.split("-", 3);
        var fechaFinInput = document
            .getElementById("fechaF")
            .value.split("-", 3);
        var horaInicioInput = document
            .getElementById("horaI")
            .value.split(":", 2);
        var horaFinInput = document.getElementById("horaF").value.split(":", 2);

        var fechaState = {
            fechaInicio: new Date(
                fechaInicioInput[0],
                fechaInicioInput[1],
                fechaInicioInput[2],
                horaInicioInput[0],
                horaInicioInput[1]
            ),
            fechaFin: new Date(
                fechaFinInput[0],
                fechaFinInput[1],
                fechaFinInput[2],
                horaFinInput[0],
                horaFinInput[1]
            ),
        };

        compararFechas(fechaState);
        setFechas(fechaState);
    }

    function compararFechas(fecha) {
        if ((fecha.fechaFin - fecha.fechaInicio) / 1000 >= 0) {
            if ((fecha.fechaFin - fecha.fechaInicio) / 1000 < 3600) {
                var minutos = (fecha.fechaFin - fecha.fechaInicio) / 1000 / 60;

                if (minutos < 10) {
                    setTotalHora("00:0" + minutos);
                } else {
                    setTotalHora("00:" + minutos);
                }
            } else {
                var hora = Math.trunc(
                    (fecha.fechaFin - fecha.fechaInicio) / 1000 / 3600
                );
                var minutos =
                    (((fecha.fechaFin - fecha.fechaInicio) / 1000) % 3600) / 60;

                if (hora < 10) {
                    if (minutos < 10) {
                        setTotalHora("0" + hora + ":0" + minutos);
                    } else {
                        setTotalHora("0" + hora + ":" + minutos);
                    }
                } else {
                    if (minutos < 10) {
                        setTotalHora(hora + ":0" + minutos);
                    } else {
                        setTotalHora(hora + ":" + minutos);
                    }
                }
            }
        } else {
            setTotalHora("00:00");
        }
    }

    return (
        <div className="div-events text-center">
            <div className="hour-zone text-center">
                <div className="start-hour">
                    <h6 className="main-card-title my-2">Inicio</h6>
                    <input id="fechaI" onChange={cambiaHoraTotal} type="date" />
                    <input id="horaI" onChange={cambiaHoraTotal} type="time" />
                </div>
                <div className="calculated-hour">
                    <h6 className="main-card-title my-2">Total</h6>
                    <span>{totalHora}</span>
                </div>
                <div className="end-hour">
                    <h6 className="main-card-title my-2">Final</h6>
                    <input id="fechaF" type="date" onChange={cambiaHoraTotal} />
                    <input id="horaF" type="time" onChange={cambiaHoraTotal} />
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
            <div className="category-zone">
                <InsCategoria />
                {/*<InsCategoria metodo='actualizaCategorias'/> y esas categorias guardadas se pasan a InsTiempoEmpresaSala*/}
            </div>
            <div className="organization-zone">
                <h6 className="main-card-title main-card-title-left mb-1">
                    ORGANIZACION
                </h6>
                <InsTiempoEmpresaSala />
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
