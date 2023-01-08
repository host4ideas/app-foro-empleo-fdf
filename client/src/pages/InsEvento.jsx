// React
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
// Components
import InsTiempoEmpresaSala from "../components/InsTiempoEmpresaSala";
import BackButton from "../components/BackButton";
// Styles
import { FaArrowLeft, FaCheck } from "react-icons/fa";
// Routes
import { INSCATEGORIA, INSEMPRESA, INSSALAS, PRIVATE } from "../utils/paths";
import { useAuthContext } from "../contexts/authContext";
import { useEventoContext } from "../contexts/eventoContext";
// Utils
import deepDiffMapper from "../lib/deepDiffMapper";

function InsEvento() {
    const datePicker = useRef(null);
    const timePicker = useRef(null);

    const { adminSocket } = useAuthContext();
    const {
        tiemposEventos,
        eventoSelected,
        updatedEvento,
        originalEvento,
        setUpdatedEvento,
        setOriginalEvento,
        tiemposEmpresasSalas,
    } = useEventoContext();

    const [fechas, setFechas] = useState({ fechaInicio: "" });
    const [longEmp, setLongEmp] = useState(0);
    const [longSal, setLongSal] = useState(0);
    const [longCat, setLongCat] = useState(0);

    const [tiemposEventosFiltered, setTiemposEventosFiltered] = useState([]);
    const [cleanedArrayTimers, setCleanedArrayTimers] = useState([]);

    const [tiempoInicial, setTiempoInicial] = useState();
    const [fechaInicial, setFechaInicial] = useState();
    const [nombreEvento, setNombreEvento] = useState();

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

    const handleClickUpdate = () => {
        // Coger el evento (idEvento, nombreEvento, inicioEvento, finEvento)
        // Comparar el evento original con el actualizado
        // Actualizar

        const eventoDiff = deepDiffMapper.map(
            originalEvento.evento,
            updatedEvento.evento
        );

        const eventoDifFKeys = Object.keys(eventoDiff);

        eventoDifFKeys.forEach((key) => {
            const resultTimer = tESDiff[key];

            if (resultTimer.type) {
                if (resultTimer.type === "created") {
                    console.log("Created");
                } else if (resultTimer.type === "deleted") {
                    console.log("Deleted");
                }
            } else {
                // Unchanged or updated properties
                const propertiesKeys = Object.keys(resultTimer);

                propertiesKeys.forEach((key) => {
                    const property = resultTimer[key];

                    if (property.type === "unchanged") {
                        console.log("Property unchanged");
                    } else if (resultTimer[key] === "updated") {
                        console.log("Property updatedunchanged");
                    }
                });
            }
        });

        // Coger el tiempos empresas salas originales del evento
        // Comparar los timers originales con los nuevos
        // Actualizar

        const tESDiff = deepDiffMapper.map(
            originalEvento.tiemposEmpresasSalas,
            updatedEvento.tiemposEmpresasSalas
        );

        const tESDKeys = Object.keys(tESDiff);

        tESDKeys.forEach((key) => {
            const resultTimer = tESDiff[key];

            if (resultTimer.type) {
                if (resultTimer.type === "created") {
                    console.log("Created");
                } else if (resultTimer.type === "deleted") {
                    console.log("Deleted");
                }
            } else {
                // Unchanged or updated properties
                const propertiesKeys = Object.keys(resultTimer);

                propertiesKeys.forEach((key) => {
                    const property = resultTimer[key];

                    if (property.type === "unchanged") {
                        console.log("Property unchanged");
                    } else if (resultTimer[key] === "updated") {
                        console.log("Property updatedunchanged");
                    }
                });
            }
        });

        // Coger los timers originales del evento
        // Comparar los timers originales con los nuevos
        // Actualizar

        const timersDiff = deepDiffMapper.map(
            originalEvento.temporizadores,
            updatedEvento.temporizadores
        );

        const temporizadoresKeys = Object.keys(timersDiff);

        temporizadoresKeys.forEach((key) => {
            const resultTimer = timersDiff[key];

            if (resultTimer.type) {
                if (resultTimer.type === "created") {
                    console.log("Created");
                } else if (resultTimer.type === "deleted") {
                    console.log("Deleted");
                }
            } else {
                // Unchanged or updated properties
                const propertiesKeys = Object.keys(resultTimer);

                propertiesKeys.forEach((key) => {
                    const property = resultTimer[key];

                    if (property.type === "unchanged") {
                        console.log("Property unchanged");
                    } else if (resultTimer[key] === "updated") {
                        console.log("Property updatedunchanged");
                    }
                });
            }
        });
    };

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
            // Remove other eventos
            const arrayFiltered = tiemposEventos.filter(
                (tiempoEvento) =>
                    tiempoEvento.idEvento === eventoSelected.idEvento
            );
            // Remove duplicated timers
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
            // Sort
            setCleanedArrayTimers(
                filteredArrayByIdTimer.sort(
                    (a, b) => new Date(a.inicioTimer) - new Date(b.inicioTimer)
                )
            );
            // Sort
            setTiemposEventosFiltered(
                arrayFiltered.sort(
                    (a, b) => new Date(a.inicioTimer) - new Date(b.inicioTimer)
                )
            );
            // Change first inicioTimer to fechaInicio
            setTiemposEventosFiltered((tiemposEventosFiltered) =>
                tiemposEventosFiltered.filter((tiempoEvento, index) => {
                    if (index === 0) {
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
    }, [
        tiemposEventos,
        eventoSelected,
        fechas.fechaInicio,
        updatedEvento.evento,
        setUpdatedEvento,
    ]);

    // Creation of updatedEvento and originalEvento
    useEffect(() => {
        setUpdatedEvento((updatedEvento) => ({
            ...updatedEvento,
            temporizadores: tiemposEventosFiltered,
            tiemposEmpresasSalas: tiemposEmpresasSalas.filter(
                (tiempoEmpresaSala) =>
                    tiempoEmpresaSala.idEvento === eventoSelected.idEvento
            ),
            evento: {
                inicioEvento: eventoSelected.inicioEvento,
                nombreEvento: eventoSelected.nombreEvento,
            },
        }));
        setOriginalEvento((originalEvento) => ({
            ...originalEvento,
            temporizadores: tiemposEventosFiltered,
            tiemposEmpresasSalas: tiemposEmpresasSalas.filter(
                (tiempoEmpresaSala) =>
                    tiempoEmpresaSala.idEvento === eventoSelected.idEvento
            ),
            evento: {
                inicioEvento: eventoSelected.inicioEvento,
                nombreEvento: eventoSelected.nombreEvento,
            },
        }));
    }, [
        setOriginalEvento,
        setUpdatedEvento,
        tiemposEventosFiltered,
        eventoSelected,
        tiemposEmpresasSalas,
    ]);

    // Update updatedEvento
    useEffect(() => {
        setUpdatedEvento((updatedEvento) => ({
            ...updatedEvento,
            evento: {
                inicioEvento: fechaInicial,
                nombreEvento: nombreEvento,
            },
        }));
    }, [setUpdatedEvento, nombreEvento, fechaInicial]);

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
        <div className="container">
            <div className="d-flex justify-content-between">
                <div>
                    <Link to="/" className="icon-container principal">
                        <FaArrowLeft className="icon" />
                    </Link>
                </div>
                <div>
                    <button
                        className="icon-container working"
                        onClick={handleClickUpdate}
                    >
                        <FaCheck className="icon" />
                    </button>
                </div>
            </div>

            <div className="container-card mb-3">
                <div className="start-hour">
                    <h6 className="main-card-title main-card-title-left">
                        FECHA Y HORA DEL EVENTO
                    </h6>
                    <div className="card-flex">
                        <div className="card-input-50">
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
                        </div>
                        <div className="card-input-50">
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
                </div>
            </div>

            <div className="container-card mb-3">
                <h6 className="main-card-title main-card-title-left">
                    NOMBRE DEL EVENTO
                </h6>
                <div className="card-input">
                    <input
                        className="form-control rounded-0"
                        type="text"
                        required
                        autoComplete="off"
                        onChange={(e) => {
                            setNombreEvento(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="container-links mb-3">
                <Link className="card-link" to={"/" + PRIVATE + "/" + INSSALAS}>
                    <span className="link">
                        <b>SALAS</b> ({longSal})
                    </span>
                </Link>
                <Link
                    className="card-link "
                    to={"/" + PRIVATE + "/" + INSEMPRESA}
                >
                    <span className="link">
                        <b>EMPRESAS</b> ({longEmp})
                    </span>
                </Link>
                <Link
                    className="card-link"
                    to={"/" + PRIVATE + "/" + INSCATEGORIA}
                >
                    <span className="link">
                        <b>CATEGORIAS</b> ({longCat})
                    </span>
                </Link>
            </div>

            <div className="container-card mb-3">
                <h6 className="main-card-title main-card-title-left">
                    ORGANIZACIÓN
                </h6>
                <InsTiempoEmpresaSala
                    primerTiempo={fechas.fechaInicio}
                    cleanedArrayTimers={cleanedArrayTimers}
                />
            </div>
        </div>
    );
}
export default InsEvento;
