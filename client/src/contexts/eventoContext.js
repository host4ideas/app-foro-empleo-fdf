import {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect
} from "react";
import PropTypes from "prop-types";

export const EventoContext = createContext();

export default function EventoContextProvider({ children }) {
    const [eventoSelected, setEventoSelected] = useState(null);
    const [tiemposEventos, setTiemposEventos] = useState([]);
    const [tiemposEmpresasSalas, setTiemposEmpresasSalas] = useState([]);
    const [updatedEvento, setUpdatedEvento] = useState([]);
    const [originalEvento, setOriginalEvento] = useState([]);

    const value = useMemo(
        () => ({
            eventoSelected: eventoSelected,
            setEventoSelected: setEventoSelected,
            setTiemposEventos: setTiemposEventos,
            tiemposEventos: tiemposEventos,
            tiemposEmpresasSalas: tiemposEmpresasSalas,
            setTiemposEmpresasSalas: setTiemposEmpresasSalas,
            updatedEvento: updatedEvento,
            setUpdatedEvento: setUpdatedEvento,
            originalEvento: originalEvento,
            setOriginalEvento: setOriginalEvento,
        }),
        [
            eventoSelected,
            tiemposEventos,
            setTiemposEventos,
            setEventoSelected,
            tiemposEmpresasSalas,
            setTiemposEmpresasSalas,
            updatedEvento,
            setUpdatedEvento,
            originalEvento,
            setOriginalEvento,
        ]
    );

    return (
        <EventoContext.Provider value={value}>
            {children}
        </EventoContext.Provider>
    );
}

EventoContextProvider.propTypes = {
    children: PropTypes.object,
};

export function useEventoContext() {
    return useContext(EventoContext);
}
