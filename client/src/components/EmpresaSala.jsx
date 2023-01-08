import React from "react";
import style from "./InsTiempoEmpresaSala.module.css";

export default function EmpresaSala({ sala, tiempoInicial, empresas }) {
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
                    <tr>
                        <td className="fw-bold">{tiempoInicial}</td>
                        <td>
                            <select className={style.tableSelect}>
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
