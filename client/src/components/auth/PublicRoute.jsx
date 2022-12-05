import { Navigate, Outlet } from "react-router-dom";
import { DETALLES_EVENTO } from "../../utils/paths";
import { useAuthContext } from "../../contexts/authContext";

export default function PublicRoute() {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to={DETALLES_EVENTO} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
