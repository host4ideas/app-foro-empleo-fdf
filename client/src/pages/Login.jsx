import { useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import authService from "../services/auth.service";
import axios from "axios";
import { AiOutlineUser, AiOutlineArrowRight} from "react-icons/ai";
import { MdLockOutline } from "react-icons/md"
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
    const { login } = useAuthContext();
    const [validate] = useState(localStorage.getItem("ok"));
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function handleInputUserChange(event) {
        setUser(event.target.value);
    }

    function handleInputPassChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {

        /* event.preventDefault();
        authService(user, password);
        if (validate) {
            login();
        } */

        event.preventDefault()

        const params = new URLSearchParams();
        params.append("username", user);
        params.append("password", password);
        axios.post("http://localhost:3001/login", params).then((res) => {
            console.log(res.data);
        });

    }

    return (
        <div className="div-login">
            <h1>Login</h1>
            <form 
                onSubmit={handleSubmit}
            >
                <div>
                    <div className="form-inputs up">
                        <AiOutlineUser style={{"marginLeft":"10px","marginRight":"10px"}}/>
                        <input
                            type="text"
                            value={user}
                            onChange={handleInputUserChange}
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-inputs down">
                        <MdLockOutline style={{"marginLeft":"10px","marginRight":"10px"}}/>
                        <input
                            type="text"
                            value={password}
                            onChange={handleInputPassChange}
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div className="button-input">
                    <button type="submit"><AiOutlineArrowRight/></button>
                </div>
            </form>
            <div className="link-events">
                <Link to={"/"}>Event</Link>
            </div>
            <div className="img-clock">
                <img src="https://i.ibb.co/FHxG5k7/imageonline-co-transparentimage.png"/>
            </div>
        </div>
    );
}

export default Login;
