import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md"
import { FaTrash } from "react-icons/fa"
import { AiFillPlusCircle } from "react-icons/ai"
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import './InsSala.css'

function InsSala() {

    const { isAuthenticated, clientSocket, adminSocket } = useAuthContext();

    const [listaSalas, setListaSalas] = useState([]);
    const [sala, setSala] = useState("");

    function getListaSalas() {
        adminSocket.emit("salas", (salas) => {
            if (salas) {
                setListaSalas(salas)
                console.log(salas);
            } else {
                console.log("error getting salas");
            }
        });
    }

    function cambiaSala(e) {
        setSala(document.getElementById("inputNameRoom").value);
    }

    function createSala() {
        adminSocket.emit("create sala",sala,(result) => {
            if (result) {
                //Notificacion acierto
                getListaSalas()
            }else{
                //Notificacion error
            }
        })
    }

    function eliminaSala(id) {
        adminSocket.emit("delete sala",id,(result) => {
            if (result) {
                //Notificacion acierto
                getListaSalas()
            }else{
                //Notificacion error
            }
        })
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
                    listaSalas.map((sala,index)=>{
                        return <div key={index} className="show-name">
                            <div className="name-room"><h5>{sala.nombreSala}</h5></div>
                            <div className="delete-room-icon"><button onClick={() => eliminaSala(sala.idSala)}><FaTrash/></button></div>
                        </div>
                    })
                }
                </div>
            </div>

        </div>
    );
}

export default InsSala;