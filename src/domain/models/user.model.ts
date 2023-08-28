export type UserId = string;

export interface User {
  username: UserId;
  password: string;
  accessToken?: AuthToken;
}

export type AuthToken = string;
