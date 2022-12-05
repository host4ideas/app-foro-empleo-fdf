import { useState, useEffect } from "react";

function InsTimer() {

    const [categorias, setCategorias] = useState([]);

    const [fechaI, setFechaI] = useState("");
    const [horaI, setHoraI] = useState("");
    const [minutoI, setMinutoI] = useState("");
    const [idcat, setIdcat] = useState(0)

    function handleInputChangeFI(e) {
        setFechaI(e.target.value);
    }

    function handleInputChangeMI(e) {
        setMinutoI(e.target.value);
    }

    function handleInputChangeHI(e) {
        setHoraI(e.target.value);
    }

    function handleInputChangeS(e) {
        setIdcat(e.target.value);
    }

    useEffect(() => {

        //DENTRO DE CADA IF, HAY QUE HACER UN SETIDTIM CON EL PRIMER ID
        //Con axios es mas facil, el idloquesea response[0].idLoquesea, y luego el array con todo loquesea = response
        
        if (window.localStorage.getItem("categorias") != null) {
            setCategorias(JSON.parse(window.localStorage.getItem("categorias")))
        }else{
            setCategorias([{"categoria":"Sin opciones","idCategoria":-1}]);
            setIdcat(-1)
        }

    }, []);

    function handleSubmit(e) {

        e.preventDefault();

        //codigo para insertar timer
        //hay que sustituir por procedimiento para bbdd
        
        var arrayTimers = [];
        var fechaIni = new Date(fechaI).setHours(horaI,minutoI)/1000;

        console.log(idcat)

        if (idcat != -1){

            if (window.localStorage.getItem("timers") == null){
                arrayTimers.push({"idTemporizador":0,"inicio":fechaIni, "idCategoria":parseInt(idcat), "pausa":false})
            }else{
                arrayTimers = JSON.parse(window.localStorage.getItem("timers"));
                arrayTimers.push({"idTemporizador":0,"inicio":fechaIni, "idCategoria":parseInt(idcat), "pausa":false})   
            }
    
            window.localStorage.setItem("timers",JSON.stringify(arrayTimers));
            console.log(JSON.parse(window.localStorage.getItem("timers")))
    
            /* localStorage.removeItem("timers"); */

        }else{

            alert("Debes introducir una categoria. Para crearla dirigite a InsCategoria")

        }
        

    }

    return (
        <div style={{"marginTop":"25px"}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Introduzca fecha inicial para el timer:</label>
                    <input
                        type="date"
                        value={fechaI}
                        onChange={handleInputChangeFI}
                        style={{"margin":"15px"}}
                        required
                    />
                </div>
                <div>
                    <label>Introduzca hora y minuto: (XX:XX)</label>
                    <input
                        type="number"
                        value={horaI}
                        min="0"
                        max="23"
                        onChange={handleInputChangeHI}
                        style={{"margin":"15px"}}
                        required
                    />
                    <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutoI}
                        onChange={handleInputChangeMI}
                        style={{"margin":"15px"}}
                        required
                    />
                </div>
                <div>
                    <label>Selecciona una categoria:</label>
                    <select onChange={handleInputChangeS} required style={{"margin":"15px"}}>
                        {
                            categorias.map((categoria,index)=>{
                                return(<option key={index} value={categoria.idCategoria}>{categoria.categoria}</option>)
                            })
                        }
                    </select>
                </div>
                <button style={{"margin":"15px"}} type="submit">Insertar sala</button>
            </form>
        </div>
    );
}

export default InsTimer;