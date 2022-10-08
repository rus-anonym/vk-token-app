import React from "react";
import { FormItem, Select } from "@vkontakte/vkui";
import { directApps } from "../../../../constants";

const DirectAppSelect = ({ setCredentials, }: {
  setCredentials: React.Dispatch<
    React.SetStateAction<{
      clientId: number;
      clientSecret: string;
    } | null>
  >;
}): JSX.Element => {
    return (
        <FormItem top="Select app">
            <Select
                onChange={(event): void => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const app = directApps.find(
                        (x) => x.id === Number(event.target.value)
                    )!;
                    setCredentials({
                        clientId: app.id,
                        clientSecret: app.secret,
                    });
                }}
                placeholder="Not selected"
                options={directApps.map(({
                    id: value, name: label
                }) => ({
                    value,
                    label,
                }))}
            />
        </FormItem>
    );
};

export default DirectAppSelect;