import React from "react";
import {
    PanelHeader, SplitCol, SplitLayout, ViewWidth, useAdaptivity
} from "@vkontakte/vkui";
import {
    Match, ModalRoot, Root, View
} from "@itznevikat/router";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";

import Main from "./pages/main";
import CaptchaResolveModalCard from "./modals/captcha";
import TwoFactorModalCard from "./modals/2fa";
import DirectAuthResponseCard from "./modals/DirectAuthResponse";

const Layout = (): JSX.Element => {

    const { viewWidth } = useAdaptivity();
    const isDesktop = viewWidth >= ViewWidth.TABLET;


    return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
        <Match initialURL="/">
            <SplitLayout
                modal={
                    <ModalRoot>
                        <CaptchaResolveModalCard nav="captcha-resolve-modal-card" />
                        <TwoFactorModalCard nav="2fa-modal-card" />
                        <DirectAuthResponseCard nav="direct-auth-response-modal-card" />
                    </ModalRoot>
                }
                style={{ justifyContent: "center" }}
                header={<PanelHeader separator={isDesktop} />}
            >
                <SplitCol animate={false}
                    spaced={isDesktop}
                    width={isDesktop ? "560px" : "100%"}
                    maxWidth={isDesktop ? "560px" : "100%"}
                >
                    <Root nav="/">
                        <View nav="/">
                            <Main nav="/" />
                        </View>
                    </Root>
                </SplitCol>
            </SplitLayout>
        </Match>
    );
};

export default Layout;
