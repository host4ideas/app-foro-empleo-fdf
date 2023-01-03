import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./AddButton.module.css";

export default function AddButton({ clickHandler }) {
    return (
        <button
            className={styles.submitButton}
            type="button"
            onClick={clickHandler}
        >
            <AiOutlinePlus className="icon-container icon" />
        </button>
    );
}
