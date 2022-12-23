import React, { useState } from "react";
import Timer from "../components/Timer";
import Sala from "../components/Sala";
import { FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { INSEVENTO, PRIVATE } from "../utils/paths";
import { useAuthContext } from "../contexts/authContext";
import "./table.css";
import "./detallesEvento.css";
import io from "socket.io-client";
// Where te Socket.io server is running
const socket = io("http://localhost:3001");

export default function DetallesEvento() {
    const { logout } = useAuthContext();
    const [salas, setSalas] = useState(["Prueba"]);

    const mostrarSalas = (salas) => {
        setSalas(salas);
    };
    socket.emit("get salas", mostrarSalas);

    return (
        <div className="container text-center">
            <div className="row justify-content-between">
                <div className="col-4">
                    {/* ICON LOGOUT */}
                    <div className="icon-container red">
                        <FaSignOutAlt
                            className="icon"
                            onClick={() => logout()}
                        />
                    </div>
                </div>
                <div className="col-4">
                    {/* ICON EDIT */}
                    <div className="icon-container blue">
                        <Link to={PRIVATE + "/" + INSEVENTO}>
                            <FaRegEdit className="icon" />
                        </Link>
                    </div>
                </div>
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
                {salas.map((ele, index) => {
                    return (
                        <Sala
                            nombre={ele}
                            numeroSala={index}
                            key={ele + index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
