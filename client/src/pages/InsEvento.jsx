import { useState } from "react";

function InsEvento() {

    const [nombre, setNombre] = useState("");

    const [fechaI, setFechaI] = useState("");
    const [horaI, setHoraI] = useState("");
    const [minutoI, setMinutoI] = useState("");

    const [fechaF, setFechaF] = useState("");
    const [horaF, setHoraF] = useState("");
    const [minutoF, setMinutoF] = useState("");


    function handleInputChangeT(e) {
        setNombre(e.target.value);
    }

    function handleInputChangeFI(e) {
        setFechaI(e.target.value);
    }

    function handleInputChangeMI(e) {
        setMinutoI(e.target.value);
    }

    function handleInputChangeHI(e) {
        setHoraI(e.target.value);
    }

    function handleInputChangeFF(e) {
        setFechaF(e.target.value);
    }

    function handleInputChangeMF(e) {
        setMinutoF(e.target.value);
    }

    function handleInputChangeHF(e) {
        setHoraF(e.target.value);
    }
    
    function handleSubmit(e) {

        e.preventDefault();

        //Codigo para preparar tiempo a insertar

        //Guardamos los segundos totales de la fecha (MILISEGUNDOS si quitas el /1000), junto la hora y el minuto
        var tiempoIni = new Date(fechaI).setHours(horaI,minutoI)/1000;
        var tiempoFin = new Date(fechaF).setHours(horaF,minutoF)/1000;

        //Prueba para comprobar tiempo restante con la duracion

         //codigo para insertar empresa
        //hay que sustituir por procedimiento para bbdd
        //La pausa sera global para todos los tiempos insertados
        //Hay que mirar como insertar tiempos (Fecha de inicio en seg + Sumar duracion en seg + Sumar pausa si > 0 en seg= Total )
        //Se resta la duracion en segundos de la fecha actual

        //IMPORTANTE, PARA RECOGER LUEGO EL TIEMPO(SI FUERA NECESARIO) MULTIPLICA POR 1000 INICIOEVENTO Y FINEVENTO

        var arrayEventos = [];

        if (tiempoFin >= tiempoIni){

            if (window.localStorage.getItem("eventos") == null){
                arrayEventos.push({"idEvento":0,"nombreEvento":nombre,"inicioEvento":tiempoIni,"finEvento":tiempoFin})
            }else{
                arrayEventos = JSON.parse(window.localStorage.getItem("eventos")); 
                arrayEventos.push({"idEvento":0,"nombreEvento":nombre,"inicioEvento":tiempoIni,"finEvento":tiempoFin})
            }
    
            window.localStorage.setItem("eventos",JSON.stringify(arrayEventos));
                
            console.log(JSON.parse(window.localStorage.getItem("eventos")))
    
              /* window.localStorage.removeItem("eventos"); */
        }else{

            alert("La fecha y hora de inicio debe ser antes que la fecha y hora de fin")

        }
        
        

    }

    return (
        <div style={{"marginTop":"25px"}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Introduzca nombre del evento:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={handleInputChangeT}
                        style={{"margin":"15px"}}
                        required
                    />
                </div>
                <div>
                    <label>Introduzca fecha inicial del evento:</label>
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
                    <label>Introduzca fecha de fin del evento:</label>
                    <input
                        type="date"
                        value={fechaF}
                        onChange={handleInputChangeFF}
                        style={{"margin":"15px"}}
                        required
                    />
                </div>
                <div>
                    <label>Introduzca hora y minuto: (XX:XX)</label>
                    <input
                        type="number"
                        value={horaF}
                        min="0"
                        max="23"
                        onChange={handleInputChangeHF}
                        style={{"margin":"15px"}}
                        required
                    />
                    <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutoF}
                        onChange={handleInputChangeMF}
                        style={{"margin":"15px"}}
                        required
                    />
                </div>
                <button style={{"margin":"15px"}} type="submit">Insertar tiempo</button>
            </form>
        </div>
    );
}

export default InsEvento;