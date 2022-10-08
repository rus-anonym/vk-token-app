import { contextBridge, ipcRenderer } from "electron";
import { IDirectAuthParams } from "../types/events";

contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("utils", {
    app: () => ipcRenderer.invoke("app"),
    openUrl: (url: string) => ipcRenderer.invoke("utils-open-url", url),
});

contextBridge.exposeInMainWorld("auth", {
    onTwoFactor: (callback: () => void) =>
        ipcRenderer.on("twoFactor-resolve", callback),
    onCaptcha: (callback: () => void) =>
        ipcRenderer.on("captcha-resolve", callback),
    sendCaptchaResponse: (code: string) =>
        ipcRenderer.send("captcha-response", code),
    sendTwoFactorResponse: (code: string) =>
        ipcRenderer.send("twoFactor-response", code),
    direct: (params: IDirectAuthParams) =>
        ipcRenderer.invoke("directAuth", params),
});
