// React
import { useState, useEffect, useRef } from "react";
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
import { useEventoContext } from "../contexts/eventoContext";

function InsEvento() {
    const datePicker = useRef(null);
    const timePicker = useRef(null);

    const { adminSocket } = useAuthContext();
    const { tiemposEventos, eventoSelected } = useEventoContext();

    const [fechas, setFechas] = useState({ fechaInicio: "" });
    const [longEmp, setLongEmp] = useState(0);
    const [longSal, setLongSal] = useState(0);
    const [longCat, setLongCat] = useState(0);

    const [tiemposEventosFiltered, setTiemposEventosFiltered] = useState([]);
    const [cleanedArrayTimers, setCleanedArrayTimers] = useState([]);

    const [tiempoInicial, setTiempoInicial] = useState();
    const [fechaInicial, setFechaInicial] = useState();

    function cambiaHoraTotal() {
        let fechaInicioInput = datePicker.current.valueAsDate
            .toISOString()
            .split("T")[0]
            .split("-");

        let horaInicioInput = timePicker.current.valueAsDate
            .toISOString()
            .split("T")[1]
            .split(":", 2);

        let fechaState = {
            fechaInicio: new Date(
                fechaInicioInput[0],
                parseInt(fechaInicioInput[1]) - 1,
                fechaInicioInput[2],
                parseInt(horaInicioInput[0]) + 1,
                horaInicioInput[1]
            ),
        };
        setFechas(fechaState);
    }

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

    useEffect(() => {
        if (fechas.fechaInicio) {
            const arrayFiltered = tiemposEventos.filter(
                (tiempoEvento) =>
                    tiempoEvento.idEvento === eventoSelected.idEvento
            );

            const filteredArrayByIdTimer = arrayFiltered.reduce(
                (acc, current) => {
                    const x = acc.find(
                        (item) => item.idTimer === current.idTimer
                    );
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                },
                []
            );

            setCleanedArrayTimers(
                filteredArrayByIdTimer.sort(
                    (a, b) => new Date(a.inicioTimer) - new Date(b.inicioTimer)
                )
            );
            setTiemposEventosFiltered(
                arrayFiltered.sort(
                    (a, b) => new Date(a.inicioTimer) - new Date(b.inicioTimer)
                )
            );

            setTiemposEventosFiltered((tiemposEventosFiltered) =>
                tiemposEventosFiltered.filter((tiempoEvento, index) => {
                    if (index === 10) {
                        tiempoEvento.inicioTimer = fechas.fechaInicio;
                    }
                    return true;
                })
            );
            datePicker.current.valueAsDate = new Date(
                eventoSelected.inicioEvento
            );
            timePicker.current.valueAsDate = new Date(
                eventoSelected.inicioEvento
            );
        }
    }, [tiemposEventos, eventoSelected, fechas.fechaInicio]);

    useEffect(() => {
        console.log(fechas.fechaInicio);
        console.log(tiemposEventosFiltered);
    }, [fechas.fechaInicio, tiemposEventosFiltered]);

    useEffect(() => {
        const initialTime = new Date(eventoSelected.inicioEvento);

        let fechaInicioInput = initialTime
            .toISOString()
            .split("T")[0]
            .split("-");

        let horaInicioInput = initialTime
            .toISOString()
            .split("T")[1]
            .split(":", 2);

        let fechaState = {
            fechaInicio: new Date(
                fechaInicioInput[0],
                parseInt(fechaInicioInput[1]) - 1,
                fechaInicioInput[2],
                horaInicioInput[0],
                horaInicioInput[1]
            ),
        };

        setFechas(fechaState);
    }, [eventoSelected.inicioEvento]);

    return (
        <div className="div-events text-center">
            <div className="hour-zone text-center">
                <div className="start-hour">
                    <h6 className="main-card-title my-2">Inicio</h6>
                    <input
                        id="fechaI"
                        type="date"
                        onChange={(e) => {
                            setFechaInicial(e.target.value);
                            cambiaHoraTotal();
                        }}
                        value={fechaInicial}
                        ref={datePicker}
                    />
                    <input
                        id="horaI"
                        type="time"
                        onChange={(e) => {
                            setTiempoInicial(e.target.value);
                            cambiaHoraTotal();
                        }}
                        value={tiempoInicial}
                        ref={timePicker}
                    />
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
                <InsTiempoEmpresaSala
                    primerTiempo={fechas.fechaInicio}
                    tiemposEventosFiltered={tiemposEventosFiltered}
                    cleanedArrayTimers={cleanedArrayTimers}
                />
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
