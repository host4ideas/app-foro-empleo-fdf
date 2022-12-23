import { useState } from "react";
import InsCategoria from "../components/InsCategoria";
import InsTiempoEmpresaSala from "../components/InsTiempoEmpresaSala"
import {NavLink} from 'react-router-dom'
import './InsEvento.css'
function InsEvento() {
    const [fechas, setFechas] = useState({fechaInicio: "",fechaFin: ""});
    const [totalHora, setTotalHora] = useState("00:00")
    function cambiaHoraTotal() {
        var fechaInicioInput = document.getElementById("fechaI").value.split("-",3);
        var fechaFinInput = document.getElementById("fechaF").value.split("-",3);
        var horaInicioInput = document.getElementById("horaI").value.split(":",2);
        var horaFinInput = document.getElementById("horaF").value.split(":",2);
        var fechaState = {
            fechaInicio: new Date(fechaInicioInput[0],fechaInicioInput[1],fechaInicioInput[2],horaInicioInput[0],horaInicioInput[1]),
            fechaFin: new Date(fechaFinInput[0],fechaFinInput[1],fechaFinInput[2],horaFinInput[0],horaFinInput[1])
        }
        compararFechas(fechaState)
        setFechas(fechaState)
    }
    function compararFechas(fecha) {
        if ((fecha.fechaFin - fecha.fechaInicio)/1000 >= 0) {
            if (((fecha.fechaFin - fecha.fechaInicio)/1000 < 3600)) {
                var minutos = ( ((fecha.fechaFin - fecha.fechaInicio)/1000 ) / 60 )
                if(minutos < 10) {
                    setTotalHora("00:0" + minutos);
                }else{
                    setTotalHora("00:" + minutos);
                }
            }else{
                var hora = Math.trunc( ((fecha.fechaFin - fecha.fechaInicio)/1000 ) / 3600 )
                var minutos = (((fecha.fechaFin - fecha.fechaInicio)/1000) % 3600)/60
                if (hora < 10) {
                    if(minutos < 10) {
                        setTotalHora("0"+ hora + ":0" + minutos);
                    }else{
                        setTotalHora("0"+ hora + ":" + minutos);
                    }
                }else{
                    if(minutos < 10) {
                        setTotalHora(hora + ":0" + minutos);
                    }else{
                        setTotalHora(hora + ":" + minutos);
                    }
                }
            }
        }else{
            setTotalHora("00:00")
        }
    }
    return (
        <div className="div-events text-center">
            <div className="hour-zone text-center">
                <div className="start-hour">
                    <h6>Inicio</h6>
                    <input id="fechaI" onChange={cambiaHoraTotal} type="date"/>
                    <input id="horaI" onChange={cambiaHoraTotal} type="time"/>
                </div>
                <div className="calculated-hour">
                    <h6>Total</h6>
                    <p>{totalHora}</p>
                </div>
                <div className="end-hour">
                    <h6>Final</h6>
                    <input id="fechaF" type="date" onChange={cambiaHoraTotal}/>
                    <input id="horaF" type="time" onChange={cambiaHoraTotal}/>
                </div>
            </div>
            <div className="event-name">
                <h6>NOMBRE DEL EVENTO</h6>
                <div>
                    <input
                        type="text"
                        required
                    />
                </div>
            </div>
            <div className="company-room-show">
                <div className="room-show">
                <NavLink to="/public/inssalas">SALAS <span> - (0 salas)</span></NavLink>
                </div>
                <div className="company-show">
                <NavLink to="/public/insempresa">EMPRESAS <span> - (0 empresas)</span></NavLink>
                </div>
            </div>
            <div className="category-zone">
                <InsCategoria/>
            </div>
            <div className="organization-zone">
                <h6>ORGANIZACION</h6>
                <InsTiempoEmpresaSala/>
            </div>
            <button className="button-create">CREAR</button>
        </div>
    );
}
export default InsEvento;