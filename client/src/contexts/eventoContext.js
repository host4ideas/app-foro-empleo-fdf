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

    const value = useMemo(
        () => ({ evento: evento, changeEvento: changeEvento }),
        [evento, changeEvento]
    );

    const addPropertiesEvento = (newProperties) => {
        const updatedEvento = { ...evento, newProperties };
        setNewEvento(updatedEvento);
    };

    const checkNewEvento = () => {
        Object.keys(newEvento).forEach((key) => {
            if (!newEvento[key]) {
                throw new Error("Propiedad " + key + " falta");
            }
        });
        return true;
    };

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
