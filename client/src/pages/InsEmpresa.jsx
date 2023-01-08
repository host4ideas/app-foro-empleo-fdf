import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { FaTrash, FaTimes, FaPlus, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./InsStyles.css";
import { INSEVENTO, PRIVATE } from "../utils/paths";

function InsEmpresa() {
    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();

    const [listaEmpresas, setListaEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState("");

    function getListaEmpresas() {
        adminSocket.emit("empresas", (empresas) => {
            if (empresas) {
                setListaEmpresas(empresas.reverse());
            } else {
                console.log("error getting empresas");
            }
        });
    }

    function createEmpresa() {
        if (!empresa) {
            console.log("vacio");
        } else {
            adminSocket.emit("create empresa", empresa, (result) => {
                if (result) {
                    //Notificacion acierto
                    getListaEmpresas();
                    setEmpresa("");
                } else {
                    //Notificacion error
                }
            });
        }
    }

    function eliminaEmpresa(id) {
        adminSocket.emit("delete empresa", id, (result) => {
            if (result) {
                //Notificacion acierto
                getListaEmpresas();
            } else {
                //Notificacion error
            }
        });
    }

    useEffect(() => {
        getListaEmpresas();
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
                <h6 className="main-card-title">NUEVA EMPRESA</h6>
                <div className="card-input">
                    <input
                        id="inputNameCompany"
                        type="text"
                        required
                        value={empresa}
                        onChange={(e) =>
                            setEmpresa(e.target.value.toUpperCase())
                        }
                        autoComplete="off"
                    />
                </div>
                <div className="icon-container principal add">
                    <FaPlus
                        className="icon"
                        onClick={() => {
                            createEmpresa();
                        }}
                    />
                </div>
            </div>

            <div className="mt-5">
                {listaEmpresas.length === 0 ? (
                    <h4 className="title-description">
                        Añada las empresas que necesite{" "}
                    </h4>
                ) : (
                    <>
                        <h4 className="title-description">
                            Empresas Registradas
                        </h4>
                        <div className="container-list">
                            {listaEmpresas.map((empresa, index) => {
                                return (
                                    <div key={index} className="element-list">
                                        <div className="element-title">
                                            <h5>{empresa.nombreEmpresa}</h5>
                                        </div>

                                        <button
                                            className="icon-container danger"
                                            onClick={() =>
                                                eliminaEmpresa(
                                                    empresa.idEmpresa
                                                )
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

export default InsEmpresa;
