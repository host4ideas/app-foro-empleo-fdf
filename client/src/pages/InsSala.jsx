import { useState, useEffect } from "react";
import { FaTrash, FaTimes, FaPlus, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import "./InsStyles.css";
import { INSEVENTO, PRIVATE } from "../utils/paths";

import Loading from "../components/Loading";
import { toast } from "react-toastify";

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
                    toast.success("Sala añadida correctamente", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        newestOnTop: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    getListaSalas();
                    setSala("");
                } else {
                    //Notificacion error
                    toast.error("Hubo un error al intentar añadir una sala", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        newestOnTop: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    console.log("error");
                }
            });
        }
    }

    function eliminaSala(id) {
        adminSocket.emit("delete sala", id, (result) => {
            if (result) {
                //Notificacion acierto
                toast.success("Sala eliminada correctamente", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                getListaSalas();
            } else {
                //Notificacion error
                toast.error("Hubo un error al intentar eliminar una sala", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    newestOnTop: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        });
    }

    useEffect(() => {
        getListaSalas();
    }, []);

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <div>
                    <div className="icon-container principal">
                        <Link to={"/" + PRIVATE + "/" + INSEVENTO}>
                            <FaArrowLeft className="icon" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container-card">
                <h6 className="main-card-title">NUEVA SALA</h6>
                <div className="card-input">
                    <input
                        id="inputNameRoom"
                        type="text"
                        required
                        value={sala}
                        onChange={(e) => setSala(e.target.value.toUpperCase())}
                        autoComplete="off"
                    />
                </div>

                <div
                    onClick={() => createSala()}
                    className="icon-container principal add"
                >
                    <FaPlus className="icon" />
                </div>
            </div>

            <div className="mt-5">
                {listaSalas.length === 0 ? (
                    <h4 className="title-description">
                        Añada las salas que necesite{" "}
                    </h4>
                ) : (
                    <>
                        <h4 className="title-description">Salas Registradas</h4>
                        <div className="container-list">
                            {listaSalas.map((sala, index) => {
                                return (
                                    <div key={index} className="element-list">
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
                            <Link
                                to={"/" + PRIVATE + "/" + INSEVENTO}
                                className="btn btn-success mt-2"
                            >
                                Confirmar
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default InsSala;
