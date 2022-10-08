import React from "react";
import {
    FormItem, IconButton, Input
} from "@vkontakte/vkui";
import { Icon16Clear } from "@vkontakte/icons";

const LoginForm = ({
    login,
    setLogin,
}: {
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
    return (
        <FormItem top="Login">
            <Input
                type="text"
                value={login}
                placeholder="Your login"
                onChange={(event): void => {
                    setLogin(event.target.value);
                }}
                after={
                    login !== "" && (
                        <IconButton
                            hoverMode="opacity"
                            aria-label="Очистить поле"
                            onClick={(): void => setLogin("")}
                        >
                            <Icon16Clear />
                        </IconButton>
                    )
                }
            />
        </FormItem>
    );
};

export default LoginForm;