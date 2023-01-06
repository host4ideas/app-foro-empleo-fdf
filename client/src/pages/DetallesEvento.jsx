import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
import Sala from "../components/Sala";
import { FaSignOutAlt, FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import { useAuthContext } from "../contexts/authContext";
import "./table.css";
import "./detallesEvento.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { LOGIN, PUBLIC } from "../utils/paths";

export default function DetallesEvento() {
    const { logout } = useAuthContext();
    const { isAuthenticated, adminSocket } = useAuthContext();
    const [salas, setSalas] = useState([]);
    let { nombreevento } = useParams();

    useEffect(() => {
        if (adminSocket) {
            adminSocket.emit("salas", (salas) => {
                if (salas) {
                    setSalas(salas);
                } else {
                    console.log("error getting salas");
                }
            });
        }
    }, [adminSocket]);

    return (
        <div className="container text-center">
            <div className="d-flex justify-content-between">
                <div>
                    <div className="icon-container principal">
                        <Link to="/">
                            <FaArrowLeft className="icon" />
                        </Link>
                    </div>
                </div>
                {
                    //COMPROBAR SI ESTA LOGEADO
                    isAuthenticated ? (
                        <div>
                            {/* ICON LOGOUT */}
                            <div className="icon-container danger">
                                <FaSignOutAlt
                                    className="icon"
                                    onClick={() => logout()}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* ICON LOGIN */}
                            <div className="icon-container principal">
                                <Link to={"/" + PUBLIC + "/" + LOGIN}>
                                    <FaSignInAlt className="icon" />
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
            <Timer />
            <div className="table-container">
                <div className="table-header">
                    <h2>INICIO</h2>
                    <h2>CATEGORIA</h2>
                </div>
                <div className="table-body">
                    <div className="table-row working">
                        <h3>9:00</h3>
                        <h3>WORK</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:15</h3>
                        <h3>DESCANSO</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:20</h3>
                        <h3>WORK</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:35</h3>
                        <h3>WORK</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:50</h3>
                        <h3>WORK</h3>
                    </div>
                </div>
            </div>
            <div className="salas-container mt-4">
                {salas.map((sala, index) => {
                    return (
                        <Sala
                            nombre={sala.nombreSala}
                            nombreEvento={nombreevento}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
