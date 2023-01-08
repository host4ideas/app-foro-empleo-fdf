// React
import React, { useState, useEffect } from "react";
// Context
import { useAuthContext } from "../contexts/authContext";
// Components
import { FaTrash, FaTimes, FaPlus, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
// Notifications
import { toast } from "react-toastify";
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

    function createCategoria() {
        if (adminSocket && nombre && nombre !== "" && tiempo && tiempo > 0) {
            adminSocket.emit(
                "create categoria",
                {
                    categoria: nombre,
                    duracion: tiempo,
                    idCategoria: 0,
                },
                (result) => {
                    if (result) {
                        getListaCategorias();
                        setNombre("");
                        setTiempo("");
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

    function deleteCategoria(id) {
        adminSocket.emit("delete categoria", id, (result) => {
            if (result) {
                //NOTIFICACION CORRECTO
                getListaCategorias();
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
        });
    }

    function updateCategoria() {
        const uCategoria = {
            categoria: nombre,
            duracion: tiempo,
            idCategoria: categoria.idCategoria,
        };

        adminSocket.emit("update categoria", uCategoria, (result) => {
            if (result) {
                //NOTIFICACION CORRECTO
                getListaCategorias();
                setNombre("");
                setTiempo("");
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
        });
        setEdit(false);
    }

    function handleUseCategory() {
        console.timeLog("clicked");
    }

    function handleInputChangeN(e) {
        setNombre(e.target.value.toUpperCase());
    }

    function handleInputChangeT(e) {
        setTiempo(e.target.value.toUpperCase());
    }

    function handleUpdate(categoria) {
        setEdit(true);
        setCategoria(categoria);
        setNombre(categoria.categoria);
        setTiempo(categoria.duracion);
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
                            value={nombre}
                            onChange={handleInputChangeN}
                            autoComplete="off"
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="card-input-50">
                        <input
                            type="number"
                            required
                            value={tiempo}
                            onChange={handleInputChangeT}
                            autoComplete="off"
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
                    <div
                        onClick={() => {
                            createCategoria();
                        }}
                        className="icon-container principal add"
                    >
                        <FaPlus className="icon" />
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
                                                handleUpdate(categoria);
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
                                <Link
                                    to={"/" + PRIVATE + "/" + INSEVENTO}
                                    className="btn btn-success mt-2"
                                >
                                    Confirmar
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default InsCategoria;
