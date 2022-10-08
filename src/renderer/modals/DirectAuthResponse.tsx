import React, { FC, useState } from "react";

import { useMeta } from "@itznevikat/router";
import {
    Button, Cell, Group, Link, ModalCard, NavIdProps
} from "@vkontakte/vkui";
import { Icon28CalendarOutline } from "@vkontakte/icons";
import { copyTextToClipboard } from "@vkontakte/vkjs";
import { IDirectAuthResponse } from "../../types/events";

const DirectAuthResponseCard: FC<NavIdProps> = ({ nav }) => {
    const {
        token, user, email
    } = useMeta<IDirectAuthResponse>();

    const [isCopied, setIsCopied] = useState(false);

    return (
        <ModalCard
            onClose={(): null => null}
            nav={nav}
            header="Your token"
            actions={
                <Button
                    size="l"
                    mode="primary"
                    disabled={isCopied}
                    onClick={(): void => {
                        void copyTextToClipboard(token);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2500);
                    }}
                >
                    {isCopied ? "Copied" : "Copy"}
                </Button>
            }
        >
            <Group>
                <Cell disabled>
                    Token: {token.substring(0, 3)}****{token.substring(token.length - 3)}
                </Cell>
                <Cell disabled>
                    User: <Link onClick={(): void => {
                        void window.utils.openUrl(`https://vk.com/id${user}`);
                    }}>https://vk.com/id{user}</Link>
                </Cell>
                {/*
                WTF?? expires always zero
                <Cell disabled multiline before={<Icon28CalendarOutline />}>
                    Expired {formatDistance(Date.now() + expires * 1000, Date.now())}
                </Cell> */}
                {email && (
                    <Cell disabled multiline before={<Icon28CalendarOutline />}>
                        E-Mail: {email}
                    </Cell>
                )}
            </Group>
        </ModalCard>
    );
};

export default DirectAuthResponseCard;
