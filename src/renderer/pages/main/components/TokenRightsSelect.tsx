import React from "react";
import { FormItem } from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/unstable";

import { userScopesList } from "../../../../constants";

const TokenRightsSelect = ({
    selectedOptions,
    setSelectedOptions,
}: {
  selectedOptions: {
    value: string;
    label: string;
}[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<{
    value: string;
    label: string;
}[]>>;
}): JSX.Element => {
    return <FormItem top="Select token rights">
        <ChipsSelect
            emptyText="You select all rights"
            placeholder="Not selected"
            onChange={setSelectedOptions}
            value={selectedOptions}
            closeAfterSelect={false}
            options={userScopesList.map(({
                id: value, name: label
            }) => ({
                value,
                label,
            }))}
        />
    </FormItem>;
};

export default TokenRightsSelect;