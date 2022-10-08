import { ipcMain, shell } from "electron";

ipcMain.handle("utils-open-url", async (event, url) => {
    return await shell.openExternal(url as string);
});