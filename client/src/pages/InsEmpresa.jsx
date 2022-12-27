import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai"
import { FaTrash } from "react-icons/fa"
import { NavLink } from "react-router-dom";
import { postEmpresa, getEmpresas, deleteEmpresa } from "../services/EmpresaService";
import './InsEmpresa.css'

function InsEmpresa() {

    const [listaEmpresas, setListaEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState("");

    function getListaEmpresas() {
        getEmpresas().then(res => {
            setListaEmpresas(res.data)
        })
    }

    function cambiaEmpresa(e) {
        setEmpresa(document.getElementById("inputNameCompany").value);
    }

    function createEmpresa() {
        postEmpresa(empresa.toUpperCase()).then(res => {
            document.getElementById("inputNameCompany").value = "";
            getListaEmpresas()
        })
    }

    function eliminaEmpresa(id) {
        deleteEmpresa(id).then(res => {
            getListaEmpresas()
        })
    }

    useEffect(() => {
       getListaEmpresas()
    }, []);

    return (
        <div className="div-company">

            <div className="button-zone">
                <div className="cancel-button">
                    <NavLink to="/public/insevento"><button><MdCancel/></button></NavLink>
                </div>
                <div className="add-button">
                    <button onClick={() => createEmpresa()}><AiFillPlusCircle/></button>
                </div>
            </div>

            <div className="add-room-zone">
                <h6>NOMBRE DE LA EMPRESA</h6>
                <div className="inputs-zone">
                    <div className="name-room">
                        <input
                            id="inputNameCompany"
                            type="text"
                            required
                            onChange={() => cambiaEmpresa()}
                        />
                    </div>
                    <div className="check-room" style={{"width":"15%","textAlign":"end"}}>
                        <input
                            type="checkbox"
                            required
                        />
                    </div>
                </div>
            </div>
            
            <div className="show-all-company">
                <h6>Empresas Registradas</h6>
                <div className="scroll-company">
                {
                    listaEmpresas.map((empresa,index)=>{
                        return <div key={index} className="show-name">
                            <div className="name-company"><h5>{empresa.nombreEmpresa}</h5></div>
                            <div className="delete-company-icon"><button onClick={() => eliminaEmpresa(empresa.idEmpresa)}><FaTrash/></button></div>
                        </div>
                    })
                }
                </div>
            </div>
        </div>
    );
}

export default InsEmpresa;