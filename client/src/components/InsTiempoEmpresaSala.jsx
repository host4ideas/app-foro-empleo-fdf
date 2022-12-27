import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import './InsTiempoEmpresaSala.css'
import axios from "axios";

function InsTiempoEmpresaSala() {

    const [empresas, setEmpresas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {

        /* getEmpresas().then(res => {
            setEmpresas(res.data);
        })
        getSalas().then(res => {
            setSalas(res.data)
            cambiaTablaSala()
        })
        axios.get("https://apitimersfgg2022.azurewebsites.net/api/CategoriasTimer").then(res => {
            setCategorias(res.data)
        }) */

    }, []);

    function cambiaTablaSala() {
        var nomSala = document.getElementById("select-room").selectedOptions[0].innerText;
        var tablasSala = document.getElementsByClassName("div-table-room");
        
        /* for (var i=0; i < tablasSala.length; i++) {
            if (tablasSala[i].classList.contains("room-"+nomSala)){
                tablasSala[i].style.display = "block"
            }else{
                tablasSala[i].style.display = "none"
            }
        } */
    }

    return (
        <div style={{"marginTop":"10px"}}>
            <table className="tabla-tes" width="100%">
                <thead>
                    <tr>
                        <th>INICIO</th>
                        <th rowspan="3">CATEGORIA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="hora">9:00</td>
                        <td rowspan="3">
                            <select style={{"width":"100%","textAlign":"center"}}>
                                {
                                    /* categorias.map((categoria,index) => {
                                        return <option value={categoria.duracion}>{categoria.categoria}</option>
                                    }) */
                                }
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="extra-tes" type="submit"><AiOutlinePlus/></button>
            <div style={{"width":"100%","margin":"15px 0px 15px 0px"}}>
                <select id="select-room" onChange={() => cambiaTablaSala()} style={{"width":"100%","textAlign":"center","outline":"none","padding":"7px","borderRadius":"100px"}}>
                    {/* {salas.map((sala,index) => {
                        return <option value={sala.idSala}>{sala.nombreSala}</option>
                    })} */}
                </select>
            </div>
            {
                /* salas.map((sala,index) => {
                    return <div className={"div-table-room room-"+sala.nombreSala}>
                        <table className={"tabla-tes"} width="100%">
                            <thead>
                                <tr>
                                    <th>INICIO</th>
                                    <th rowspan="3">EMPRESA {sala.nombreSala}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="hora">9:00</td>
                                    <td rowspan="3">
                                        <select style={{"width":"100%","textAlign":"center"}}>
                                            {
                                                empresas.map((empresa,index) => {
                                                    return <option key={index} value={empresa.idEmpresa}>{empresa.nombreEmpresa}</option>
                                                })
                                            }
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                }) */
            }
            
        </div>
    );
}
export default InsTiempoEmpresaSala;