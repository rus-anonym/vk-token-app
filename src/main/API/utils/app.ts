import { app, ipcMain } from "electron";

ipcMain.handle("app", () => {
    return { version: app.getVersion(), };
});