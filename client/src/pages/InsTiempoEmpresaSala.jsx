import { useState, useEffect } from "react";

function InsTiempoEmpresaSala() {

    const [timers, setTimers] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [eventos, setEventos] = useState([]);

    const [idtim, setIdtim] = useState(0)
    const [idemp, setIdemp] = useState(0)
    const [idsal, setIdsal] = useState(0)
    const [ideve, setIdeve] = useState(0)

    function handleInputChangeT(e) {
        setIdtim(e.target.value);
    }

    function handleInputChangeS(e) {
        setIdsal(e.target.value);
    }

    function handleInputChangeEV(e) {
        setIdeve(e.target.value);
    }

    function handleInputChangeEM(e) {
        setIdemp(e.target.value);
    }

    useEffect(() => {
        setTimers(JSON.parse(window.localStorage.getItem("timers")))
        setEmpresas(JSON.parse(window.localStorage.getItem("empresas")))
        setSalas(JSON.parse(window.localStorage.getItem("salas")))
        setEventos(JSON.parse(window.localStorage.getItem("eventos")))
    }, []);

    function handleSubmit(e) {

        e.preventDefault();

        //codigo para insertar timer
        //hay que sustituir por procedimiento para bbdd
        
        var arrayTieEmpSal = [];

        if (window.localStorage.getItem("tieempsal") == null){
            arrayTieEmpSal.push({"id":0,"idTimer":parseInt(idtim),"idEmpresa":parseInt(idemp),"idSala":parseInt(idsal),"idEvento":parseInt(ideve)})
        }else{
            arrayTieEmpSal = JSON.parse(window.localStorage.getItem("tieempsal"));
            arrayTieEmpSal.push({"id":0,"idTimer":parseInt(idtim),"idEmpresa":parseInt(idemp),"idSala":parseInt(idsal),"idEvento":parseInt(ideve)})   
        }

        window.localStorage.setItem("tieempsal",JSON.stringify(arrayTieEmpSal));
        console.log(JSON.parse(window.localStorage.getItem("tieempsal")))

        /* localStorage.removeItem("tieempsal"); */

    }

    return (
        <div style={{"marginTop":"25px"}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Selecciona una Sala:</label>
                    <select onChange={handleInputChangeS} required style={{"margin":"15px"}}>
                        {
                            salas.map((sala,index)=>{
                                return(<option key={index} value={sala.idSala}>{sala.nombre}</option>)
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Selecciona un Timer:</label>
                    <select onChange={handleInputChangeT} required style={{"margin":"15px"}}>
                        {
                            timers.map((timer,index)=>{
                                return(<option key={index} value={timer.idTemporizador}>{new Date(timer.inicio*1000).toLocaleString()}</option>)
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Selecciona una Empresa:</label>
                    <select onChange={handleInputChangeEM} required style={{"margin":"15px"}}>
                        {
                            empresas.map((empresa,index)=>{
                                return(<option key={index} value={empresa.idEmpresa}>{empresa.nombreEmpresa}</option>)
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Selecciona un Evento:</label>
                    <select onChange={handleInputChangeEV} required style={{"margin":"15px"}}>
                        {
                            eventos.map((evento,index)=>{
                                return(<option key={index} value={evento.idEvento}>{evento.nombreEvento}</option>)
                            })
                        }
                    </select>
                </div>
                <button style={{"margin":"15px"}} type="submit">Insertar Tiempo de Empresa para Sala</button>
            </form>
        </div>
    );
}

export default InsTiempoEmpresaSala;