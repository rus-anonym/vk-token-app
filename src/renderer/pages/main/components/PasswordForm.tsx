import React from "react";
import {
    FormItem, IconButton, Input
} from "@vkontakte/vkui";
import { Icon16Clear } from "@vkontakte/icons";

const PasswordForm = ({
    password,
    setPassword,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
    return <FormItem top="Password">
        <Input
            type="password"
            value={password}
            placeholder="Your password"
            onChange={(event): void => {
                setPassword(event.target.value);
            }}
            after={
                password !== "" && (
                    <IconButton
                        hoverMode="opacity"
                        aria-label="Очистить поле"
                        onClick={(): void => setPassword("")}
                    >
                        <Icon16Clear />
                    </IconButton>
                )
            }
        />
    </FormItem>;
};

export default PasswordForm;