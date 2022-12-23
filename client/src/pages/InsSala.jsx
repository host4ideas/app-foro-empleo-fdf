import { useState } from "react";
import { MdCancel } from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai"
import { NavLink } from "react-router-dom";
import './InsSala.css'

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
        <div className="div-rooms">

            <div className="button-zone">
                <div className="cancel-button">
                    <NavLink to="/public/insevento"><button><MdCancel/></button></NavLink>
                </div>
                <div className="add-button">
                    <button><AiFillPlusCircle/></button>
                </div>
            </div>

            <div className="add-room-zone">
                <h6>NOMBRE DE LA SALA</h6>
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
                <label>Introduzca nombre de la sala:</label>
                <input
                    type="text"
                    value={sala}
                    onChange={handleInputChange}
                    style={{"margin":"15px"}} 
                />
                <button style={{"margin":"15px"}} type="submit">Insertar sala</button>
            </form> */}
        </div>
    );
}

export default InsSala;