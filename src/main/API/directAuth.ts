import { DirectAuthorization } from "@vk-io/authorization";
import { ipcMain } from "electron";
import { IDirectAuthParams } from "../../types/events";
import callbackService from "../callbackService";

ipcMain.handle("directAuth", async (event, params) => {
    const isParams = (params: unknown): params is IDirectAuthParams => {
        return true;
    };

    if (!isParams(params)) {
        return;
    }

    const direct = new DirectAuthorization({
        callbackService: callbackService.instance,
        ...params
    });

    return await direct.run();
});