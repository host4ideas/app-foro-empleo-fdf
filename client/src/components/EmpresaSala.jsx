import style from "./InsTiempoEmpresaSala.module.css";
import React, { useEffect, useState } from "react";
import { useEventoContext } from "../contexts/eventoContext";

export default function EmpresaSala({ sala, empresas, primerTiempo }) {
    const [tiemposEventosBySala, setTiemposEventosBySala] = useState([]);
    const [tiemposEmpresasSalasBySala, setTiemposEmpresasSalasBySala] =
        useState([]);

    const { tiemposEmpresasSalas, setUpdatedEvento, originalEvento } =
        useEventoContext();

    useEffect(() => {
        const arrayFiltered = originalEvento.tiemposEmpresasSalas.filter(
            (tiempoEvento) =>
                tiempoEvento.idSala === tiemposEmpresasSalas.idSala
        );
        arrayFiltered.sort(
            (a, b) => new Date(a.inicioTimer) - new Date(b.inicioTimer)
        );
        setTiemposEventosBySala(arrayFiltered);

        setTiemposEmpresasSalasBySala(
            tiemposEmpresasSalas.filter(
                (tiempoEvento) =>
                    tiempoEvento.idSala === tiemposEventosBySala.idSala
            )
        );
    }, [
        originalEvento.tiemposEmpresasSalas,
        tiemposEventosBySala.idSala,
        tiemposEmpresasSalas,
    ]);

    useEffect(() => {
        setUpdatedEvento((updatedEvento) => ({
            ...updatedEvento,
            tiemposEmpresasSalas: tiemposEmpresasSalasBySala,
        }));
    }, [tiemposEmpresasSalasBySala, setUpdatedEvento]);

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
                    {tiemposEventosBySala.map((tiempoEvento, index) => (
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
