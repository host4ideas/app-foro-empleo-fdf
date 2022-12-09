import React from "react";
import Timer from "../components/Timer";
import Sala from "../components/Sala";
import { FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { INSEVENTO } from "../utils/paths";
import { useAuthContext } from "../contexts/authContext";
import "./table.css";
import "./detallesEvento.css";

export default function DetallesEvento() {
    const { logout } = useAuthContext();

    const localSalas = [
        "Desarrollo",
        "Informatica",
        "Botanica",
        "Desarrollo2",
        "Desarrollo3",
        "Desarrollo4",
        "Desarrollo5",
    ];

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
                    <Link to={INSEVENTO}>
                        <div className="icon-container blue">
                            <FaRegEdit className="icon" />
                        </div>
                    </Link>
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

            <div className="salas-container ">
                {localSalas.map((ele, index) => {
                    return <Sala nombre={ele} numeroSala={index} />;
                })}
            </div>
        </div>
    );
}
