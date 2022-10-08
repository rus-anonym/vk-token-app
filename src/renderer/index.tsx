import { IpcRendererEvent } from "electron";
import {
    ICallbackServiceCaptchaPayload,
    ICallbackServiceTwoFactorPayload,
} from "vk-io";

import ReactDOM from "react-dom";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";

import App from "./app";
import { IDirectAuthParams, IDirectAuthResponse } from "../types/events";

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    readonly auth: {
      onCaptcha(
        callback: (
          event: IpcRendererEvent,
          payload: ICallbackServiceCaptchaPayload
        ) => void
      ): void;
      sendCaptchaResponse(code: string): void;
      onTwoFactor(
        callback: (
          event: IpcRendererEvent,
          payload: ICallbackServiceTwoFactorPayload
        ) => void
      ): void;
      sendTwoFactorResponse(code: string): void;
      direct: (params: IDirectAuthParams) => Promise<IDirectAuthResponse>;
    };

    readonly utils: {
      openUrl(url: string): Promise<void>;
      app(): { version: string };
    };

    readonly versions: {
      node(): string;
      chrome(): string;
      electron(): string;
    };
  }
}

ReactDOM.render(
    <ConfigProvider appearance="dark">
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
    document.getElementById("root")
);
