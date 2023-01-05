import { useState, useEffect } from "react";
import { FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import "./InsStyles.css";
import { INSEVENTO, PRIVATE } from "../utils/paths";

import Loading from "../components/Loading";

function InsSala() {
    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();

    const [listaSalas, setListaSalas] = useState([]);
    const [sala, setSala] = useState("");
    const [load, setLoad] = useState(false);

    function getListaSalas() {
        adminSocket.emit("salas", (salas) => {
            if (salas) {
                setListaSalas(salas.reverse());
                setLoad(true);
            } else {
                console.log("error getting salas");
            }
        });
    }

    function createSala() {
        if (!sala) {
            //Notificacion vacio
            console.log("vacio");
        } else {
            adminSocket.emit("create sala", sala, (result) => {
                if (result) {
                    //Notificacion acierto
                    getListaSalas();
                    setSala("");
                } else {
                    //Notificacion error
                    console.log("error");
                }
            });
        }
    }

    function eliminaSala(id) {
        adminSocket.emit("delete sala", id, (result) => {
            if (result) {
                //Notificacion acierto
                getListaSalas();
            } else {
                //Notificacion error
            }
        });
    }

    useEffect(() => {
        getListaSalas();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div>
                        <button
                            onClick={() => createSala()}
                            className="icon-container principal"
                        >
                            <FaPlus className="icon" />
                        </button>
                    </div>
                    <div>
                        <div className="icon-container danger">
                            <Link to={"/" + PRIVATE + "/" + INSEVENTO}>
                                <FaTimes className="icon" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container-card">
                    <h6 className="main-card-title">NOMBRE DE LA SALA</h6>
                    <div className="card-input">
                        <input
                            id="inputNameRoom"
                            type="text"
                            required
                            value={sala}
                            onChange={(e) =>
                                setSala(e.target.value.toUpperCase())
                            }
                            autocomplete="off"
                        />
                    </div>
                </div>

                <div className="mt-5">
                    {listaSalas.length === 0 ? (
                        <h4 className="title-description">
                            Añada las salas que necesite{" "}
                        </h4>
                    ) : (
                        <>
                            <h4 className="title-description">
                                Salas Registradas
                            </h4>
                            <div className="container-list">
                                {listaSalas.map((sala, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="element-list"
                                        >
                                            <div className="element-title">
                                                <h5>{sala.nombreSala}</h5>
                                            </div>

                                            <button
                                                className="icon-container danger"
                                                onClick={() =>
                                                    eliminaSala(sala.idSala)
                                                }
                                            >
                                                <FaTrash className="icon" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success mt-2">
                                    Confirmar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {!load && <Loading />}
        </div>
    );
}

export default InsSala;
