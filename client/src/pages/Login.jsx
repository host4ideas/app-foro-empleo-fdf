import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { AiOutlineUser, AiOutlineArrowRight } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Login.css";
import Loading from "../components/Loading";

function Login() {
    const { login } = useAuthContext();

    const [user, setUser] = useState("JUAN");
    const [password, setPassword] = useState("12345");
    const [loading, setLoading] = useState(false);

    function handleInputUserChange(event) {
        setUser(event.target.value);
    }

    function handleInputPassChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        login(user, password);
    }

    return (
        <div>
            <h1 className="text-center title">Login</h1>
            <form onSubmit={handleSubmit} className="container-form">
                <div className="form-input">
                    <AiOutlineUser />
                    <input
                        type="text"
                        value={user}
                        onChange={handleInputUserChange}
                        placeholder="Username"
                    />
                </div>
                <div className="form-line"></div>
                <div className="form-input">
                    <MdLockOutline />
                    <input
                        type="text"
                        value={password}
                        onChange={handleInputPassChange}
                        placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    className="form-button icon-container"
                    style={{ backgroundColor: "var(--primary-color)" }}
                >
                    <AiOutlineArrowRight />
                </button>
            </form>

            <Link className="link-events" to={"/"}>
                Event
            </Link>

            <div className="img-clock"></div>
            {loading && <Loading />}
        </div>
    );
}

export default Login;
