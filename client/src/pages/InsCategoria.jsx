// React
import React, { useState, useEffect } from "react";
// Context
import { useAuthContext } from "../contexts/authContext";
// Components
import AddButton from "../components/AddButton";
// Styles
import styles from "./InsCategoria.module.css";

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
                    }
                }
            );
        }
    }

    function handleUseCategory() {
        console.timeLog("clicked");
    }

    return (
        <div className={styles.divCategory}>
            <h6 className="main-card-title main-card-title-left mb-2">
                CATEGORIAS TEMPORIZADORES
            </h6>
            <form>
                {categorias.map((categoria, index) => {
                    return (
                        <div key={index} className={styles.inputsZone}>
                            <div className={styles.nameInput}>
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
                            <div className={styles.minuteInput}>
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
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    onClick={handleUseCategory}
                                />
                                <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                >
                                    Utilizar esta categoria
                                </label>
                            </div>
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
