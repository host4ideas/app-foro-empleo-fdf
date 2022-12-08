import React from "react";
import Timer from "../components/Timer";
import { FaRegEdit, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { INSEVENTO } from "../utils/paths";
import { useAuthContext } from "../contexts/authContext";

export default function DetallesEvento() {
    const { logout } = useAuthContext();

    return (
        <div className="container text-center">
            <div className="row justify-content-between">
                <div className="col-4">
                    {/* ICON LOGOUT */}
                    <div className="icon-container red">
                        <FaSignOutAlt
                            className="icon"
                            onClick={() => logout()}
                        />
                    </div>
                </div>
                <div className="col-4">
                    {/* ICON EDIT */}
                    <Link to={INSEVENTO}>
                        <div className="icon-container blue">
                            <FaRegEdit className="icon" />
                        </div>
                    </Link>
                </div>
            </div>

            <Timer />
        </div>
    );
}
