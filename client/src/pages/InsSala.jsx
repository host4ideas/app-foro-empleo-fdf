import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md"
import { FaTrash } from "react-icons/fa"
import { AiFillPlusCircle } from "react-icons/ai"
import { NavLink } from "react-router-dom";
import './InsSala.css'

function InsSala() {

    const [listaSalas, setListaSalas] = useState([]);
    const [sala, setSala] = useState("");

    function getListaSalas() {
        /* getSalas().then(res => {
            setListaSalas(res.data)
        }) */
    }

    function cambiaSala(e) {
        setSala(document.getElementById("inputNameRoom").value);
    }

    function createSala() {
        /* postSala(sala.toUpperCase()).then(res => {
            document.getElementById("inputNameRoom").value = "";
            getListaSalas()
        }) */
    }

    function eliminaSala(id) {
        /* deleteSala(id).then(res => {
            getListaSalas()
        }) */
    }

    useEffect(() => {
       getListaSalas()
    }, []);

    return (
        <div className="div-rooms">

            <div className="button-zone">
                <div className="cancel-button">
                    <NavLink to="/public/insevento"><button><MdCancel/></button></NavLink>
                </div>
                <div className="add-button">
                <button onClick={() => createSala()}><AiFillPlusCircle/></button>
                </div>
            </div>

            <div className="add-room-zone">
                <h6>NOMBRE DE LA SALA</h6>
                <div className="inputs-zone">
                    <div className="name-room">
                        <input
                            id="inputNameRoom"
                            type="text"
                            required
                            onChange={() => cambiaSala()}
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
            
            <div className="show-all-room">
                <h6>Salas Registradas</h6>
                <div className="scroll-room">
                {
                    /* listaSalas.map((sala,index)=>{
                        return <div key={index} className="show-name">
                            <div className="name-room"><h5>{sala.nombreSala}</h5></div>
                            <div className="delete-room-icon"><button onClick={() => eliminaSala(sala.idSala)}><FaTrash/></button></div>
                        </div>
                    }) */
                }
                </div>
            </div>

        </div>
    );
}

export default InsSala;