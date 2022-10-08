import React from "react";
import { FormItem, Select } from "@vkontakte/vkui";

const AuthMethodSelect = ({
    authMethod,
    setAuthMethod,
}: {
  authMethod: "direct";
  setAuthMethod: React.Dispatch<React.SetStateAction<"direct">>;
}): JSX.Element => {
    return (
        <FormItem top="Select auth method">
            <Select
                options={[
                    {
                        label: "Direct",
                        value: "direct",
                    },
                ]}
                value={authMethod}
                onChange={(event): void => {
                    setAuthMethod(event.target.value as "direct");
                }}
            />
        </FormItem>
    );
};

export default AuthMethodSelect;
