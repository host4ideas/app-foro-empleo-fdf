import React from "react";
// Icons
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
// Styles
import backButton from  "./BackButton.module.css";

export default function BackButton({ path }) {
    return (
        <Link className={backButton.backButton} to={path}>
            <GoArrowLeft className={backButton.backButton}></GoArrowLeft>
        </Link>
    );
}
