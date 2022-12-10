import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import './InsCategoria.css'


function InsCategoria() {

    const [tiempo, setTiempo] = useState("");
    const [nombre, setNombre] = useState("");

    function handleInputChangeD(e) {
        setTiempo(e.target.value);
    }

    function handleInputChangeT(e) {
        setNombre(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();

            //codigo para insertar empresa
            //hay que sustituir por procedimiento para bbdd
            //La pausa sera global para todos los tiempos insertados
            //Hay que mirar como insertar tiempos (Fecha de inicio en seg + Sumar duracion en seg + Sumar pausa si > 0 en seg= Total )
            //Se resta la duracion en segundos de la fecha actual

        var arrayCategorias = [];

        if (window.localStorage.getItem("categorias") == null){
            arrayCategorias.push({ "idCategoria":0,"duracion":parseInt(tiempo) , "categoria":nombre})
        }else{
            arrayCategorias = JSON.parse(window.localStorage.getItem("categorias")); 
            arrayCategorias.push({ "idCategoria":0,"duracion":parseInt(tiempo) , "categoria":nombre})
        }

        window.localStorage.setItem("categorias",JSON.stringify(arrayCategorias));
            
        console.log(JSON.parse(window.localStorage.getItem("categorias")))

        /* localStorage.removeItem("categorias"); */
        

    }

    return (
        <div className="div-category">
            <h6>CATEGORIAS TEMPORIZADORES</h6>
            <form onSubmit={handleSubmit}>
                <div className="inputs-zone">
                    <div className="name-input" style={{"width":"40%"}}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={handleInputChangeT}
                            required
                        />
                    </div>
                    <div className="minute-input">
                        <label>Duracion (Minutos)</label>
                        <input
                            type="number"
                            value={tiempo}
                            onChange={handleInputChangeD}
                            required
                        />
                    </div>
                </div>
                <button type="submit"><AiOutlinePlus/></button>
            </form>
        </div>
    );
}

export default InsCategoria;