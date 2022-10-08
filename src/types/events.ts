/* eslint-disable @typescript-eslint/no-unused-vars */

interface IDirectAuthParams {
  type: "direct";
  login: string;
  password: string;
  apiVersion: string;
  scope: number;
  clientId: string;
  clientSecret: string;
}

interface IDirectAuthResponse {
  email?: string | undefined;
  user: number;
  token: string;
  expires: number;
}

export type { IDirectAuthParams, IDirectAuthResponse };