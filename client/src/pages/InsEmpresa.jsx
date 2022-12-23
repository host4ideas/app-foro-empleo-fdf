import { useState } from "react";
import { MdCancel } from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai"
import { NavLink } from "react-router-dom";
import './InsEmpresa.css'

function InsEmpresa() {

    const [empresa, setEmpresa] = useState("");
    const [imagen, setImagen] = useState("");

    function handleInputChange(e) {
        setEmpresa(e.target.value);
    }

    function handleInputChangeI(e) {
        setImagen(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();

        //codigo para insertar empresa
        //hay que sustituir por procedimiento para bbdd
        
        var arrayEmpresas = [];

        if (window.localStorage.getItem("empresas") == null){
            arrayEmpresas.push({"idEmpresa":0,"nombreEmpresa":empresa,"imagen":imagen})
        }else{
            arrayEmpresas = JSON.parse(window.localStorage.getItem("empresas"));
            arrayEmpresas.push({"idEmpresa":0,"nombreEmpresa":empresa,"imagen":imagen})   
        }

        window.localStorage.setItem("empresas",JSON.stringify(arrayEmpresas));
        console.log(JSON.parse(window.localStorage.getItem("empresas")))

        /* localStorage.removeItem("empresas") */

    }

    return (
        <div className="div-company">

            <div className="button-zone">
                <div className="cancel-button">
                    <NavLink to="/public/insevento"><button><MdCancel/></button></NavLink>
                </div>
                <div className="add-button">
                    <button><AiFillPlusCircle/></button>
                </div>
            </div>

            <div className="add-room-zone">
                <h6>NOMBRE DE LA EMPRESA</h6>
                <div className="inputs-zone">
                    <div className="name-room">
                        <input
                            type="text"
                            required
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
            {/* <form onSubmit={handleSubmit}>
                <label>Introduzca nombre de la empresa:</label>
                <input
                    type="text"
                    value={empresa}
                    onChange={handleInputChange}
                    style={{"margin":"15px"}} 
                />
                <label>Introduzca imagen de la empresa:</label>
                <input
                    type="text"
                    value={imagen}
                    onChange={handleInputChangeI}
                    style={{"margin":"15px"}} 
                />
                <button style={{"margin":"15px"}} type="submit">Insertar empresa</button>
            </form> */}
        </div>
    );
}

export default InsEmpresa;