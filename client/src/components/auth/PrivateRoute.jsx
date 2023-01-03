import { Navigate, Outlet } from "react-router-dom";
import { LOGIN, PUBLIC } from "../../utils/paths";
import { useAuthContext } from "../../contexts/authContext";

export default function PrivateRoute() {
    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) {
        return <Navigate to={"/" + PUBLIC + "/" + LOGIN} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
