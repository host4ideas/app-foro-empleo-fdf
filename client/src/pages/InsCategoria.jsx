// React
import React, { useState, useEffect } from "react";
// Context
import { useAuthContext } from "../contexts/authContext";
// Components
import AddButton from "../components/AddButton";
// Styles
import styles from "./InsCategoria.module.css";
// Notifications
import { toast } from "react-toastify";

function InsCategoria() {
    const [tiempo, setTiempo] = useState("");
    const [nombre, setNombre] = useState("");
    const [categorias, setCategorias] = useState([]);
    const { adminSocket } = useAuthContext();

    useEffect(() => {
        if (adminSocket) {
            adminSocket.emit("categorias", (categorias) => {
                setCategorias(categorias);
            });
        }
    }, [setCategorias, adminSocket]);

    function handleInputChangeD(e) {
        setTiempo(e.target.value);
    }

    function handleInputChangeT(e) {
        setNombre(e.target.value);
    }

    function handleClick(e) {
        e.preventDefault();

        if (adminSocket && nombre && nombre !== "" && tiempo && tiempo > 0) {
            adminSocket.emit(
                "create categoria",
                { categoria: nombre, duracion: tiempo },
                (result) => {
                    if (result) {
                        // Notificacion acierto
                        // Recargamos las categorias
                        adminSocket.emit("categorias", (categorias) => {
                            setCategorias(categorias);
                        });
                    } else {
                        // Notificacion error
                        toast.warn("No se pudo crear la catregoria", {
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
            );
        }
    }

    const deleteCategoria = (categoria) => {
        if (adminSocket && nombre && nombre !== "" && tiempo && tiempo > 0) {
            adminSocket.emit(
                "delete categoria",
                categoria.idCategoria,
                (result) => {
                    if (result) {
                        // Notificacion acierto
                        // Recargamos las categorias
                        adminSocket.emit("categorias", (categorias) => {
                            setCategorias(categorias);
                        });
                    } else {
                        // Notificacion error
                        toast.warn("No se pudo borrar la catregoria", {
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
            );
        }
    };

    return (
        <div className={styles.divCategory}>
            <h6 className="main-card-title main-card-title-left mb-2">
                CATEGORIAS TEMPORIZADORES
            </h6>
            <form>
                {categorias.map((categoria, index) => {
                    return (
                        <div
                            key={index}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <div className="w-100 mx-1">
                                <label className="detail-card-title">
                                    Nombre:
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    defaultValue={categoria.categoria}
                                    value={nombre}
                                    onChange={handleInputChangeT}
                                    required
                                />
                            </div>
                            <div className="w-100 mx-1">
                                <label className="detail-card-title">
                                    Duracion (Minutos):
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={categoria.duracion}
                                    value={tiempo}
                                    onChange={handleInputChangeD}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger position-relative mt-4"
                                onClick={() => deleteCategoria(categoria)}
                            >
                                🗑
                            </button>
                        </div>
                    );
                })}
                <div className="text-center mt-2">
                    <AddButton clickHandler={handleClick} />
                </div>
            </form>
        </div>
    );
}

export default InsCategoria;
