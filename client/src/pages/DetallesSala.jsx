import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import { FaArrowLeft } from "react-icons/fa";

export default function DetallesSala() {
    let { nombre } = useParams();
    const navigate = useNavigate();

    return (
        <div className="container text-center">
            <div className="d-flex flex-row ">
                <div>
                    {/* ICON LOGOUT */}
                    <div className="icon-container blue">
                        <FaArrowLeft
                            className="icon"
                            onClick={() => navigate("/")}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>{nombre}</h1>
            </div>
            <Timer />
            <div className="table-container">
                <div className="table-header">
                    <h2>INICIO</h2>
                    <h2>CATEGORIA</h2>
                    <h2>EMPRESA</h2>
                </div>
                <div className="table-body details">
                    <div className="table-row working">
                        <h3>9:00</h3>
                        <h3>WORK</h3>
                        <h3>Empresa 1</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:15</h3>
                        <h3>DESCANSO</h3>
                        <h3>Empresa 2</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:20</h3>
                        <h3>WORK</h3>
                        <h3>Empresa 3</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:35</h3>
                        <h3>WORK</h3>
                        <h3>Empresa 4</h3>
                    </div>
                    <div className="table-row">
                        <h3>9:50</h3>
                        <h3>WORK</h3>
                        <h3>Empresa 5</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
