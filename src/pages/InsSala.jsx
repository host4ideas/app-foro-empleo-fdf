import { useState } from "react";

function InsSala() {

    const [sala, setSala] = useState("");

    function handleInputChange(e) {
        setSala(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();

        //codigo para insertar sala
        //hay que sustituir por procedimiento para bbdd
        
        var arraySalas = [];

        if (window.localStorage.getItem("salas") == null){
            arraySalas.push({"idSala":0,"nombre":sala})
        }else{
            arraySalas = JSON.parse(window.localStorage.getItem("salas"));
            arraySalas.push({"idSala":0,"nombre":sala})   
        }

        window.localStorage.setItem("salas",JSON.stringify(arraySalas));
        console.log(JSON.parse(window.localStorage.getItem("salas")))

        /* localStorage.clear(); */

    }

    return (
        <div style={{"marginTop":"25px"}}>
            <form onSubmit={handleSubmit}>
                <label>Introduzca nombre de la sala:</label>
                <input
                    type="text"
                    value={sala}
                    onChange={handleInputChange}
                    style={{"margin":"15px"}} 
                />
                <button style={{"margin":"15px"}} type="submit">Insertar sala</button>
            </form>
        </div>
    );
}

export default InsSala;