// React
import React, { useState, useEffect } from "react";
// Context
import { useAuthContext } from "../contexts/authContext";
// Components
import { FaTrash, FaTimes, FaPlus, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
// Styles
import { INSEVENTO, PRIVATE } from "../utils/paths";

function InsCategoria() {
    const [tiempo, setTiempo] = useState("");
    const [nombre, setNombre] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [edit, setEdit] = useState(false);
    const [categoria, setCategoria] = useState();
    const { adminSocket } = useAuthContext();

    function getListaCategorias() {
        adminSocket.emit("categorias", (categorias) => {
            if (categorias) {
                setCategorias(categorias.reverse());
            } else {
                console.log("error getting categorias");
            }
        });
    }

    function handleInputChangeN(e) {
        setNombre(e.target.value);
    }

    function handleInputChangeT(e) {
        setTiempo(e.target.value);
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
                        adminSocket.emit("create categoria", (categorias) => {
                            setCategorias(categorias);
                        });
                    } else {
                        // Notificacion error
                    }
                }
            );
        }
    }

    function deleteCategoria(id) {}

    function updateCategoria() {
        setEdit(false);
    }

    function handleUseCategory() {
        console.timeLog("clicked");
    }

    useEffect(() => {
        getListaCategorias();
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
                {edit && (
                    <div className="icon-container danger close">
                        <FaTimes
                            className="icon"
                            onClick={() => {
                                setEdit(false);
                            }}
                        />
                    </div>
                )}
                <h6 className="main-card-title">
                    {!edit ? "NUEVA CATEGORIA" : "EDITAR CATEGORIA"}
                </h6>
                <div className="card-flex">
                    <div className="card-input-50">
                        <input
                            type="text"
                            required
                            value={!edit ? nombre : categoria.categoria}
                            onChange={handleInputChangeN}
                            autocomplete="off"
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="card-input-50">
                        <input
                            type="number"
                            required
                            value={!edit ? tiempo : categoria.duracion}
                            onChange={handleInputChangeT}
                            autocomplete="off"
                            placeholder="Duración (min)"
                            min={1}
                        />
                    </div>
                </div>
                {edit ? (
                    <div className="text-center mt-3">
                        <button
                            className="btn btn-success"
                            onClick={() => {
                                updateCategoria();
                            }}
                        >
                            Editar
                        </button>
                    </div>
                ) : (
                    <div className="icon-container principal add">
                        <FaPlus
                            className="icon"
                            onClick={() => {
                                console.log("generar otra categoria");
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="mt-5">
                {categorias.length === 0 ? (
                    <h4 className="title-description">
                        Añada las categorias que necesite{" "}
                    </h4>
                ) : (
                    <>
                        <h4 className="title-description">
                            Categorias Registradas
                        </h4>
                        <div className="container-list">
                            {categorias.map((categoria, index) => {
                                return (
                                    <div key={index} className="element-list">
                                        <div className="element-title">
                                            <h5>
                                                {categoria.categoria} -{" "}
                                                {categoria.duracion} min
                                            </h5>
                                        </div>
                                        <button
                                            className="icon-container warning"
                                            onClick={() => {
                                                setEdit(true);
                                                setCategoria(categoria);
                                            }}
                                        >
                                            <FaEdit className="icon" />
                                        </button>
                                        <button
                                            className="icon-container danger"
                                            onClick={() =>
                                                deleteCategoria(
                                                    categoria.idCategoria
                                                )
                                            }
                                        >
                                            <FaTrash className="icon" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        {!edit && (
                            <div className="text-center">
                                <button className="btn btn-success mt-2">
                                    Confirmar
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default InsCategoria;
