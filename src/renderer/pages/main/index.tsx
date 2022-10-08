import React, {
    FC, useMemo, useState
} from "react";
import {
    Button,
    FormItem,
    FormLayout,
    FormLayoutGroup,
    Group,
    IconButton,
    Input,
    NavIdProps,
    Panel,
    PanelHeader,
} from "@vkontakte/vkui";
import { Icon16Clear } from "@vkontakte/icons";

import LoginForm from "./components/LoginForm";
import DirectAppSelect from "./components/DirectAppSelect";
import PasswordForm from "./components/PasswordForm";
import TokenRightsSelect from "./components/TokenRightsSelect";
import AuthMethodSelect from "./components/AuthMethodSelect";
import { push } from "@itznevikat/router";
import { userScopesList } from "../../../constants";

const Main: FC<NavIdProps> = ({ nav }) => {
    const [apiVersion, setApiVersion] = useState("5.160");
    const [authMethod, setAuthMethod] = useState<"direct">("direct");
    const [appCredentials, setAppCredentials] = useState<{
        clientId: number;
        clientSecret: string;
    } | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<
        { value: string; label: string }[]
    >([]);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const scope = useMemo(() => {
        return selectedOptions.reduce((acc, { value }) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const mask = userScopesList.find(x => x.id === value)!.mask;
            return acc + mask;
        }, 0);
    }, [selectedOptions]);
    const isValid = useMemo(() => {
        return (
            login !== "" &&
      password !== "" &&
      apiVersion !== "" &&
      appCredentials !== null &&
      selectedOptions.length > 0
        );
    }, [login, password, apiVersion, appCredentials, selectedOptions]);

    const onSubmit = async (): Promise<void> => {
        if (appCredentials === null) {
            return;
        }

        if (authMethod === "direct") {
            const response = await window.auth.direct({
                type: "direct",
                apiVersion,
                login,
                password,
                scope,
                clientId: appCredentials.clientId.toString(),
                clientSecret: appCredentials.clientSecret,
            });
            push("?modal=direct-auth-response-modal-card", response);
        }
    };

    return (
        <Panel nav={nav}>
            <PanelHeader separator={false}>VK Token App</PanelHeader>
            <Group>
                <FormLayout onSubmit={(): void => void onSubmit()}>
                    <FormLayoutGroup>
                        <LoginForm
                            login={login}
                            setLogin={setLogin}
                        />
                        <PasswordForm
                            password={password}
                            setPassword={setPassword}
                        />
                    </FormLayoutGroup>

                    <TokenRightsSelect
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                    />

                    <FormLayoutGroup>
                        <AuthMethodSelect
                            authMethod={authMethod}
                            setAuthMethod={setAuthMethod}
                        />
                        {authMethod === "direct" && (
                            <DirectAppSelect
                                setCredentials={setAppCredentials}
                            />
                        )}
                        <FormItem top="API version">
                            <Input
                                placeholder="Specify API version"
                                type="text"
                                value={apiVersion}
                                onChange={(event): void => {
                                    setApiVersion(event.target.value);
                                }}
                                after={
                                    apiVersion !== "" && (
                                        <IconButton
                                            hoverMode="opacity"
                                            aria-label="Очистить поле"
                                            onClick={(): void => setApiVersion("")}
                                        >
                                            <Icon16Clear />
                                        </IconButton>
                                    )
                                }
                            />
                        </FormItem>
                    </FormLayoutGroup>

                    <FormItem>
                        <Button stretched disabled={!isValid} size="l" onClick={(): void => void onSubmit()}>
                            Get token
                        </Button>
                    </FormItem>
                </FormLayout>
            </Group>
        </Panel>
    );
};

export default Main;
