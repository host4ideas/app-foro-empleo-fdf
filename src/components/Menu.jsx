import React from "react";
import { Link } from "react-router-dom";
import { PRIVATE, PUBLIC, LOGIN, LOGOUT, HOME, SALAS, INSEMPRESA, INSCATEGORIA, INSSALAS, INSEVENTO, INSTIMER, INSTIEMPOEMPRESASALA } from "../utils/paths";

export default function Menu() {
    return (
        <nav className="menu">
            <Link to={HOME}>Home</Link>
            <Link to={"/" + PRIVATE + "/" + SALAS}>Salas</Link>
            <Link to={"/" + PUBLIC + "/" + LOGIN}>Login</Link>
            <Link to={"/" + PRIVATE + "/" + LOGOUT}>Logout</Link>
            <Link to={"/" + PRIVATE + "/" + INSEMPRESA}>Registro empresas</Link>
            <Link to={"/" + PRIVATE + "/" + INSCATEGORIA}>Registro categoria</Link>
            <Link to={"/" + PRIVATE + "/" + INSSALAS}>Registro salas</Link>
            <Link to={"/" + PRIVATE + "/" + INSEVENTO}>Registro evento</Link>
            <Link to={"/" + PRIVATE + "/" + INSTIMER}>Registro timer</Link>
            <Link to={"/" + PRIVATE + "/" + INSTIEMPOEMPRESASALA}>Registro TiempoEmpresaSala</Link>
        </nav>
    );
}
