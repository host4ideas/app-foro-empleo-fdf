import { useState } from "react";

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
        <div style={{"marginTop":"25px"}}>
            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    );
}

export default InsEmpresa;