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
    const [newEvento, setNewEvento] = useState({});
    const [tiemposEventos, setTiemposEventos] = useState([]);

    /**
     * Changes the actual selected event
     */
    const changeEvento = useCallback(
        (newEventSelected) => {
            setEventoSelected(newEventSelected);
        },
        [setEventoSelected]
    );

    const addPropertiesEvento = useCallback(
        (newProperties) => {
            const updatedEvento = { ...newEvento, newProperties };
            setNewEvento(updatedEvento);
        },
        [setNewEvento, newEvento]
    );

    const checkNewEvento = useCallback(() => {
        Object.keys(newEvento).forEach((key) => {
            if (!newEvento[key]) {
                throw new Error("Propiedad " + key + " falta");
            }
        });
        return true;
    }, [newEvento]);

    const value = useMemo(
        () => ({
            eventoSelected: eventoSelected,
            changeEvento: changeEvento,
            addPropertiesEvento: addPropertiesEvento,
            checkNewEvento: checkNewEvento,
            setTiemposEventos: setTiemposEventos,
            tiemposEventos: tiemposEventos,
        }),
        [
            eventoSelected,
            changeEvento,
            addPropertiesEvento,
            checkNewEvento,
            tiemposEventos,
            setTiemposEventos,
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
