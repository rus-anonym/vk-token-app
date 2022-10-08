import { ICallbackServiceCaptchaPayload } from "vk-io";

import React, {
    FC, useMemo, useState
} from "react";

import { back, useMeta } from "@itznevikat/router";
import {
    Button,
    Div,
    FormItem,
    FormLayout,
    Input,
    ModalCard,
    NavIdProps,
} from "@vkontakte/vkui";

const CaptchaResolveModalCard: FC<NavIdProps> = ({ nav }) => {
    const { src } = useMeta<ICallbackServiceCaptchaPayload>();

    const [captchaText, setCaptchaText] = useState("");
    const isCaptchaEnter = useMemo(() => captchaText !== "", [captchaText]);

    const onSubmit = (): void => {
        if (!isCaptchaEnter) {
            return;
        } else {
            window.auth.sendCaptchaResponse(captchaText);
            back();
        }
    };

    return (
        <ModalCard
            onClose={(): null => null}
            nav={nav}
            header="Enter captcha"
            actions={
                <Button
                    size="l"
                    mode="primary"
                    disabled={!isCaptchaEnter}
                    onClick={onSubmit}
                >
                    Send
                </Button>
            }
        >
            <Div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <img src={`data:image/jpeg;base64,${src}`} />
            </Div>
            <FormLayout onSubmit={onSubmit}>
                <FormItem>
                    <Input
                        value={captchaText}
                        onChange={(event): void => {
                            setCaptchaText(event.target.value);
                        }}
                    />
                </FormItem>
            </FormLayout>
        </ModalCard>
    );
};

export default CaptchaResolveModalCard;