import React, { useEffect, useState } from "react";

export default function EmpresaSala({
    sala,
    empresas,
    tiemposEventosFiltered,
    primerTiempo,
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
        <div className={"div-table-room room-" + sala.nombreSala}>
            <table className={"tabla-tes"} width="100%">
                <thead>
                    <tr>
                        <th>INICIO</th>
                        <th>EMPRESA {sala.nombreSala}</th>
                    </tr>
                </thead>
                <tbody className={"tbody-" + sala.nombreSala}>
                    {tiemposEventosFiltered
                        .filter(
                            (tiempoEvento) =>
                                tiempoEvento.idSala === sala.idSala
                        )
                        .map((tiempoEvento, index) => (
                            <tr key={index}>
                                <td className="hora">
                                    {index === 0
                                        ? primerTiempo
                                              .toTimeString()
                                              .substring(0, 5)
                                        : new Date(tiempoEvento.inicioTimer)
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
