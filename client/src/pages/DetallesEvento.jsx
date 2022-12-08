import React from "react";
import Timer from "../components/Timer";
import { FaRegEdit, FaSignOutAlt } from "react-icons/fa";

export default function DetallesEvento() {
    return (
        <div className="container text-center">
            <div className="row justify-content-between">
                <div className="col-4">
                    {/* ICON LOGOUT */}
                    <button className="icon red">
                        <FaSignOutAlt />
                    </button>
                </div>
                <div className="col-4">
                    {/* ICON EDIT */}
                    <button className="icon blue">
                        <FaRegEdit />
                    </button>
                </div>
            </div>

            <Timer />
        </div>
    );
}
