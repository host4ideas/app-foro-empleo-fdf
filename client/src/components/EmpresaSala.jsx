import style from "./InsTiempoEmpresaSala.module.css";
import React, { useEffect, useState } from "react";

export default function EmpresaSala({
    sala,
    empresas,
    tiemposEventosFiltered,
}) {
    const [tiemposEventosBySala, setTiemposEventosBySala] = useState([]);

    useEffect(() => {
        const arrayFiltered = tiemposEventosFiltered.filter(
            (tiempoEvento) =>
                tiempoEvento.idSala === tiemposEventosBySala.idSala
        );
        arrayFiltered.sort(
            (a, b) => new Date(a.inicioTimer) - new Date(b.inicioTimer)
        );
        setTiemposEventosBySala(arrayFiltered);
    }, [tiemposEventosFiltered, tiemposEventosBySala.idSala]);

    return (
        <div className={"mt-2 div-table-room room-" + sala.nombreSala}>
            <table
                className={`table table-bordered table-striped text-center ${style.table}`}
            >
                <thead className={style.tableHead}>
                    <tr>
                        <th>INICIO</th>
                        <th>EMPRESA</th>
                    </tr>
                </thead>
                <tbody
                    className={`tbody-${sala.nombreSala} ${style.tableBody}`}
                >
                    {tiemposEventosFiltered
                        .filter(
                            (tiempoEvento) =>
                                tiempoEvento.idSala === sala.idSala
                        )
                        .map((tiempoEvento, index) => (
                            <tr key={index}>
                                <td className="hora fw-bold">
                                    {new Date(tiempoEvento.inicioTimer)
                                        .toTimeString()
                                        .substring(0, 5)}
                                </td>
                                <td>
                                    <select className="select-room">
                                        {empresas.map((empresa, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={empresa.idEmpresa}
                                                    selected={
                                                        tiempoEvento.idEmpresa ===
                                                        empresa.idEmpresa
                                                    }
                                                >
                                                    {empresa.nombreEmpresa}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
