import { BrowserWindow, ipcMain } from "electron";
import {
    CallbackServiceRetry,
    ICallbackServiceCaptchaPayload,
    ICallbackServiceTwoFactorPayload,
    CallbackService as NativeCallbackService,
} from "vk-io";
import axios from "axios";

class CallbackService {
    private _window: BrowserWindow | null = null;

    public readonly instance = new NativeCallbackService();

    constructor() {
        this.instance.onCaptcha(this._onCaptcha.bind(this));
        this.instance.onTwoFactor(this._onTwoFactor.bind(this));
    }

    public bindWindow(window: BrowserWindow): void {
        this._window = window;
    }

    private async _loadCaptcha(url: string): Promise<string> {
        const response = await axios.get<string>(url, { responseType: "arraybuffer", });
        return Buffer.from(response.data, "binary").toString("base64");
    }

    private async _onTwoFactor(
        payload: ICallbackServiceTwoFactorPayload,
        retry: CallbackServiceRetry
    ): Promise<void> {
        return new Promise((resolve) => {
            if (this._window === null) {
                return;
            }

            this._window.webContents.send("twoFactor-resolve", payload);
            ipcMain.once("twoFactor-response", (event, code) => {
                void retry(code as string);
            });
            resolve();
        });
    }

    private async _onCaptcha(
        payload: ICallbackServiceCaptchaPayload,
        retry: CallbackServiceRetry
    ): Promise<void> {
        payload.src = await this._loadCaptcha(payload.src);

        return new Promise((resolve) => {
            if (this._window === null) {
                return;
            }

            this._window.webContents.send("captcha-resolve", payload);
            ipcMain.once("captcha-response", (event, code) => {
                void retry(code as string);
            });
            resolve();
        });
    }
}

export default new CallbackService();
