import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import PropTypes from "prop-types";

export const EventoContext = createContext();

export default function EventoContextProvider({ children }) {
    const [eventoSelected, setEventoSelected] = useState(null);
    const [tiemposEventos, setTiemposEventos] = useState([]);
    const [tiemposEmpresasSalas, setTiemposEmpresasSalas] = useState([]);

    /**
     * Changes the actual selected event
     */
    const changeEvento = useCallback(
        (newEventSelected) => {
            setEventoSelected(newEventSelected);
        },
        [setEventoSelected]
    );

    const value = useMemo(
        () => ({
            eventoSelected: eventoSelected,
            changeEvento: changeEvento,
            setTiemposEventos: setTiemposEventos,
            tiemposEventos: tiemposEventos,
            tiemposEmpresasSalas: tiemposEmpresasSalas,
            setTiemposEmpresasSalas: setTiemposEmpresasSalas,
        }),
        [
            eventoSelected,
            tiemposEventos,
            setTiemposEventos,
            changeEvento,
            tiemposEmpresasSalas,
            setTiemposEmpresasSalas,
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
