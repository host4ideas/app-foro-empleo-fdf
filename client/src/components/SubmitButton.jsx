import React from "react";
import styles from "./AddButton.module.css";

export default function SubmitButton({ content }) {
    return (
        <button className={styles.submitButton} type="button">
            {content}
        </button>
    );
}
