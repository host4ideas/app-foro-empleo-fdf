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

    /**
     * Checks if the user is logged by reaching the server, sets the isAuthenticated state
     * accordingly {true | false}.
     */
    const changeEvento = useCallback(
        (newEvento) => {
            setEventoSelected(newEvento);
        },
        [setEventoSelected]
    );

    const addPropertiesEvento = useCallback(
        (newProperties) => {
            const updatedEvento = { ...eventoSelected, newProperties };
            setNewEvento(updatedEvento);
        },
        [setNewEvento, eventoSelected]
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
        }),
        [eventoSelected, changeEvento, addPropertiesEvento, checkNewEvento]
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
