import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { subscribeUser } from "./subscription";

import "bootstrap/dist/css/bootstrap.min.css";

window.addEventListener("beforeinstallprompt", (e) => {
    // Previene a la mini barra de información que aparezca en smartphones
    e.preventDefault();
    // log the platforms provided as options in an install prompt
    console.log(e.platforms); // e.g., ["web", "android", "windows"]
    e.userChoice.then(
        (choiceResult) => {
            console.log(choiceResult.outcome); // either "accepted" or "dismissed"
        },
        (err) => console.warn(err)
    );
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

/**
 * PRODUCTION WORKER
 */
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/**
 * PUSH NOTIFICATIONS SUBSCRIBER
 */
subscribeUser();
