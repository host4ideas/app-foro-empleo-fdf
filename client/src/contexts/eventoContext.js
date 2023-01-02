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
    const [evento, setEvento] = useState({});
    const [newEvento, setNewEvento] = useState({});

    /**
     * Checks if the user is logged by reaching the server, sets the isAuthenticated state
     * accordingly {true | false}.
     */
    const changeEvento = useCallback(
        (newEvento) => {
            setEvento(newEvento);
        },
        [setEvento]
    );

    const addPropertiesEvento = useCallback(
        (newProperties) => {
            const updatedEvento = { ...evento, newProperties };
            setNewEvento(updatedEvento);
        },
        [setNewEvento, evento]
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
            evento: evento,
            changeEvento: changeEvento,
            addPropertiesEvento: addPropertiesEvento,
            checkNewEvento: checkNewEvento,
        }),
        [evento, changeEvento, addPropertiesEvento, checkNewEvento]
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
