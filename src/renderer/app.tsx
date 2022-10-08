import React, { useEffect } from "react";
import { AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";

import Layout from "./layout";
import { push } from "@itznevikat/router";

const App = (): JSX.Element => {

    useEffect(() => {
        window.auth.onCaptcha( (event, payload) => {
            push("?modal=captcha-resolve-modal-card", payload);
        });
        window.auth.onTwoFactor( (event, payload) => {
            push("?modal=2fa-modal-card", payload);
        });
    }, []);

    return (
        <AppRoot>
            <Layout />
        </AppRoot>
    );
};

export default App;