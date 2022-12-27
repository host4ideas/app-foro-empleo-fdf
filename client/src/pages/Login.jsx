import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { AiOutlineUser, AiOutlineArrowRight } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const { login } = useAuthContext();

    const [user, setUser] = useState("JUAN");
    const [password, setPassword] = useState("12345");

    function handleInputUserChange(event) {
        setUser(event.target.value);
    }

    function handleInputPassChange(event) {
        setPassword(event.target.value);
    }

    // /**
    //  * Tries to perform the login. Updated isAuthenticated state accordingly.
    //  * @param {string} username
    //  * @param {string} password
    //  */
    // const login = (username, password) => {
    //     const params = new URLSearchParams();
    //     params.append("username", username);
    //     params.append("password", password);
    //     return axios
    //         .post("/login", params)
    //         .then((res) => {
    //             console.log(res);
    //             // setIsAuthenticated(true);
    //         })
    //         .catch(() => {
    //             console.warn("invalid or wrong credentials");
    //             // setIsAuthenticated(false);
    //         });
    // };

    async function handleSubmit(event) {
        event.preventDefault();
        login(user, password);
    }

    return (
        <div className="div-login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-inputs up">
                        <AiOutlineUser
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                        />
                        <input
                            type="text"
                            value={user}
                            onChange={handleInputUserChange}
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-inputs down">
                        <MdLockOutline
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                        />
                        <input
                            type="text"
                            value={password}
                            onChange={handleInputPassChange}
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div className="button-input">
                    <button type="submit">
                        <AiOutlineArrowRight />
                    </button>
                </div>
            </form>
            <div className="link-events">
                <Link to={"/"}>Event</Link>
            </div>
            <div className="img-clock">
                <img
                    src="https://i.ibb.co/FHxG5k7/imageonline-co-transparentimage.png"
                    alt="clock"
                />
            </div>
        </div>
    );
}

export default Login;
