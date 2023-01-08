import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useAuthContext } from "../contexts/authContext";
import PropTypes from "prop-types";

export const EventoContext = createContext();

export default function EventoContextProvider({ children }) {
    const { adminSocket } = useAuthContext();
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

    useEffect(() => {
        if (adminSocket && eventoSelected) {
            adminSocket.emit("timereventos", (tEventos) => {
                if (tEventos) {
                    setTiemposEmpresasSalas(tEventos)
                    const arrayFiltered = tEventos.filter(
                        (tiempoEvento) =>
                            tiempoEvento.idEvento === eventoSelected.idEvento
                    );

                    // Remove duplicated timers
                    const timers = arrayFiltered.reduce((acc, current) => {
                        const x = acc.find(
                            (item) => item.idTimer === current.idTimer
                        );
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);

                    const filteredArrayByIdTimer = timers.sort(
                        (a, b) =>
                            new Date(a.inicioTimer) - new Date(b.inicioTimer)
                    );

                    setTiemposEventos(filteredArrayByIdTimer);
                } else {
                    console.log("error getting timer eventoss");
                }
            });
        }
    }, [eventoSelected, adminSocket]);

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
