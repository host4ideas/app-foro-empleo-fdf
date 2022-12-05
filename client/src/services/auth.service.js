import networkRequest from "./network_request.service";
import axios from "axios";

function AuthService(user, password) {
    var data = {
        userName: user,
        password: password,
    };

    const onSuccess = (token) => {
        axios.defaults.headers.common = {
            Authorization: "Bearer " + token,
        };
        localStorage.setItem("ok", true);
    };
    const onFailure = () => {
        alert("Usuario o contraseña incorrecta");
    };

    networkRequest("post", "auth/login", data)
        .then((response) => {
            response.status === 200
                ? onSuccess(response.data.response)
                : onFailure();
        })
        .catch((error) => {
            alert("Se produjo un error al intentar logarse");
            console.log("Error al intentar logearse (404)", error);
        });
}
export default AuthService;
