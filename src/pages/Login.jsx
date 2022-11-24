import { useState } from "react";
import { PASS } from "../utils/password";
import { useAuthContext } from "../contexts/authContext";

function Login() {
    const { login } = useAuthContext();
    const [password, setPassword] = useState("");

    function handleInputChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Iniciar sesion con un servicio externo
        if (password === PASS) {
            login();
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={password}
                    onChange={handleInputChange}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;
