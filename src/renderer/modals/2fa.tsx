import React, {
    FC, useMemo, useState
} from "react";

import { back } from "@itznevikat/router";
import {
    Button,
    FormItem,
    FormLayout,
    Input,
    ModalCard,
    NavIdProps,
} from "@vkontakte/vkui";

const TwoFactorModalCard: FC<NavIdProps> = ({ nav }) => {
    // const {
    //     phoneMask, type
    // } = useMeta<ICallbackServiceTwoFactorPayload>();

    const [code, setCode] = useState("");
    const isCodeEnter = useMemo(() => code !== "", [code]);

    const onSubmit = (): void => {
        if (!isCodeEnter) {
            return;
        } else {
            window.auth.sendTwoFactorResponse(code);
            back();
        }
    };

    return (
        <ModalCard
            onClose={(): null => null}
            nav={nav}
            header="2FA"
            subheader="Enter 2FA code"
            actions={
                <Button
                    size="l"
                    mode="primary"
                    disabled={!isCodeEnter}
                    onClick={onSubmit}
                >
                    Send
                </Button>
            }
        >
            <FormLayout onSubmit={onSubmit}>
                <FormItem>
                    <Input
                        value={code}
                        onChange={(event): void => {
                            setCode(event.target.value);
                        }}
                    />
                </FormItem>
            </FormLayout>
        </ModalCard>
    );
};

export default TwoFactorModalCard;