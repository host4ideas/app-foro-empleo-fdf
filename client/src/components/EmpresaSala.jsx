import React from "react";

export default function EmpresaSala({ sala, tiempoInicial, empresas }) {
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
                    <tr>
                        <td className="hora">{tiempoInicial}</td>
                        <td>
                            <select className="select-room">
                                {empresas.map((empresa, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={empresa.idEmpresa}
                                        >
                                            {empresa.nombreEmpresa}
                                        </option>
                                    );
                                })}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
