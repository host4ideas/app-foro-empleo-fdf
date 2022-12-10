import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import './InsTiempoEmpresaSala.css'

function InsTiempoEmpresaSala() {

    const [timers, setTimers] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [eventos, setEventos] = useState([]);

    const [idtim, setIdtim] = useState(0)
    const [idemp, setIdemp] = useState(0)
    const [idsal, setIdsal] = useState(0)
    const [ideve, setIdeve] = useState(0)

    function handleInputChangeT(e) {
        setIdtim(e.target.value);
    }

    function handleInputChangeS(e) {
        setIdsal(e.target.value);
    }

    function handleInputChangeEV(e) {
        setIdeve(e.target.value);
    }

    function handleInputChangeEM(e) {
        setIdemp(e.target.value);
    }

    useEffect(() => {
        
    }, []);

    function handleSubmit(e) {

        e.preventDefault();

        //codigo para insertar timer
        //hay que sustituir por procedimiento para bbdd
        
        var arrayTieEmpSal = [];

        if (window.localStorage.getItem("tieempsal") == null){
            arrayTieEmpSal.push({"id":0,"idTimer":parseInt(idtim),"idEmpresa":parseInt(idemp),"idSala":parseInt(idsal),"idEvento":parseInt(ideve)})
        }else{
            arrayTieEmpSal = JSON.parse(window.localStorage.getItem("tieempsal"));
            arrayTieEmpSal.push({"id":0,"idTimer":parseInt(idtim),"idEmpresa":parseInt(idemp),"idSala":parseInt(idsal),"idEvento":parseInt(ideve)})   
        }

        window.localStorage.setItem("tieempsal",JSON.stringify(arrayTieEmpSal));
        console.log(JSON.parse(window.localStorage.getItem("tieempsal")))

        /* localStorage.removeItem("tieempsal"); */

    }

    return (
        <div style={{"marginTop":"10px"}}>
            <table className="tabla-tes" width="100%">
                <thead>
                    <tr>
                        <th>INICIO</th>
                        <th>CATEGORIA</th>
                        <th>SALA</th>
                        <th>EMPRESA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="hora">9:00</td>
                        <td>
                            <select>
                                <option>PAUSA</option>
                                <option>DESCANSO</option>
                                <option>SESION</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>SALA 1</option>
                                <option>SALA 2</option>
                                <option>SALA 3</option>
                            </select>
                        </td>
                        <td>
                            <select>
                                <option>EMPRESA 1</option>
                                <option>EMPRESA 2</option>
                                <option>EMPRESA 3</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="extra-tes" type="submit"><AiOutlinePlus/></button>
        </div>
    );
}

export default InsTiempoEmpresaSala;