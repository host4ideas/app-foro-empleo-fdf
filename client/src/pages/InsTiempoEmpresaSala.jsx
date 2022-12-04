import { useState, useEffect } from "react";

function InsTiempoEmpresaSala() {

    const [timers, setTimers] = useState([{"inicio":0,"idTemporizador":-1}]);
    const [empresas, setEmpresas] = useState([{"nombreEmpresa":"Sin opciones","idEmpresa":-1}]);
    const [salas, setSalas] = useState([{"nombre":"Sin opciones","idSala":-1}]);
    const [eventos, setEventos] = useState([{"nombreEvento":"Sin opciones","idEvento":-1}]);

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

        //DENTRO DE CADA IF, HAY QUE HACER UN SETIDTIM CON EL PRIMER ID
        //Con axios es mas facil, el idloquesea response[0].idLoquesea, y luego el array con todo loquesea = response

        if (window.localStorage.getItem("timers") != null) {
            setTimers(JSON.parse(window.localStorage.getItem("timers")))
            setIdtim(JSON.parse(window.localStorage.getItem("timers"))[0].idTemporizador);
        }else{
            setIdtim(-1);
        }

        if (window.localStorage.getItem("empresas") != null) {
            setEmpresas(JSON.parse(window.localStorage.getItem("empresas")))
            setIdemp(JSON.parse(window.localStorage.getItem("empresas"))[0].idEmpresa);
        }else{
            setIdemp(-1);
        }

        if (window.localStorage.getItem("salas") != null) {
            setSalas(JSON.parse(window.localStorage.getItem("salas")))
            setIdsal(JSON.parse(window.localStorage.getItem("salas"))[0].idSala);
        }else{
            setIdsal(-1);
        }

        if (window.localStorage.getItem("eventos") != null) {
            setEventos(JSON.parse(window.localStorage.getItem("eventos")))
            setIdeve(JSON.parse(window.localStorage.getItem("eventos"))[0].idEvento);
        }else{
            setIdeve(-1);
        }
        
    }, []);

    function handleSubmit(e) {

        e.preventDefault();

        //codigo para insertar timer
        //hay que sustituir por procedimiento para bbdd
        
        var arrayTieEmpSal = [];

        if (idemp == -1 || ideve == -1 || idsal == -1 || idtim == -1) {

            if (idemp == -1){
                alert("Debe insertar una empresa. Para ello, vaya a InsEmpresas")
            }

            if (ideve == -1){
                alert("Debe insertar un evento. Para ello, vaya a InsEvento")
            }

            if (idsal == -1){
                alert("Debe insertar una sala. Para ello, vaya a InsSala")
            }

            if (idtim == -1){
                alert("Debe insertar un empleado. Para ello, vaya a InsTimer")
            }

        }else{

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
                        {/*Solo se comparan las fechas porque asi se genera la new Date, si no hay fechas, no generamos nada*/}
                        {timers[0].idTemporizador != -1 &&
                            timers.map((timer,index)=>{
                                return(<option key={index} value={timer.idTemporizador}>{new Date(timer.inicio*1000).toLocaleString()}</option>)
                            })
                        }
                        {timers[0].idTemporizador == -1 &&
                            <option>Sin opciones</option>
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
                <button style={{"margin":"15px"}} type="submit">Insertar Tiempo de Empresa para Sala</button>{idsal},{idtim},{idemp},{ideve}
            </form>
        </div>
    );
}

export default InsTiempoEmpresaSala;