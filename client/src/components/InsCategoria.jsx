import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./InsCategoria.css";
import { useAuthContext } from "../contexts/authContext";

function InsCategoria() {
    const [tiempo, setTiempo] = useState("");
    const [nombre, setNombre] = useState("");
    const [categorias, setCategorias] = useState([]);
    const { adminSocket } = useAuthContext();

    if (adminSocket) {
        adminSocket.emit("categorias", (categorias) => {
            setCategorias(categorias);
        });
    }

    function handleInputChangeD(e) {
        setTiempo(e.target.value);
    }

    function handleInputChangeT(e) {
        setNombre(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="div-category">
            <h6 className="main-card-title main-card-title-left mb-2">
                CATEGORIAS TEMPORIZADORES
            </h6>
            <form onSubmit={handleSubmit}>
                <div className="inputs-zone">
                    <div className="name-input" style={{ width: "40%" }}>
                        <label className="detail-card-title">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={handleInputChangeT}
                            required
                        />
                    </div>
                    <div className="minute-input">
                        <label className="detail-card-title">
                            Duracion (Minutos):
                        </label>
                        <input
                            type="number"
                            value={tiempo}
                            onChange={handleInputChangeD}
                            required
                        />
                    </div>
                </div>
                <button type="submit">
                    <AiOutlinePlus />
                </button>
            </form>
        </div>
    );
}

export default InsCategoria;
