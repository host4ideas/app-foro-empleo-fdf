import { useState } from "react";
import InsCategoria from "../components/InsCategoria";
import InsTiempoEmpresaSala from "../components/InsTiempoEmpresaSala"
import './InsEvento.css'

function InsEvento() {
    
    function handleSubmit(e) {

    }

    return (
        <div className="div-events">


            <div className="hour-zone">
                <div className="start-hour">
                    <h6>Inicio</h6>
                    <input type="date"/>
                    <input type="time"/>
                </div>

                <div className="calculated-hour">
                    <h6>Total</h6>
                    <p>0:00</p>
                </div>

                <div className="end-hour">
                    <h6>Final</h6>
                    <input type="date"/>
                    <input type="time"/>
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
                <a href="#">SALAS <span> - (0 salas)</span></a>
                </div>

                <div className="company-show">
                <a href="#">EMPRESAS <span> - (0 empresas)</span></a>
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