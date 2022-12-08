import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";

function Login() {
    const { login } = useAuthContext();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function handleInputUserChange(event) {
        setUser(event.target.value);
    }

    function handleInputPassChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        login();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={user}
                    onChange={handleInputUserChange}
                />
                <input
                    type="text"
                    value={password}
                    onChange={handleInputPassChange}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;
