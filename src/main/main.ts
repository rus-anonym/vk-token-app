import path from "path";
import { BrowserWindow, app } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import callbackService from "./callbackService";

import "./API";

class AppUpdater {
    constructor() {
        log.transports.file.level = "info";
        autoUpdater.logger = log;
        void autoUpdater.checkForUpdatesAndNotify();
    }
}

const resolveHtmlPath = (htmlFileName: string): string => {
    if (process.env.NODE_ENV === "development") {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
};

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 750,
        webPreferences: { preload: app.isPackaged
            ? path.join(__dirname, "preload.js")
            : path.join(__dirname, "../../.erb/dll/preload.js"), },
    });

    void mainWindow.loadURL(resolveHtmlPath("index.html"));
    callbackService.bindWindow(mainWindow);

    new AppUpdater();
};

app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        void createWindow();
    }
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

void app.whenReady().then(() => {
    void createWindow();
});