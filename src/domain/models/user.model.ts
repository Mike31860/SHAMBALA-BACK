export type UserId = string;

export interface User {
  username: UserId;
  userImage?: string;
  password: string;
  accessToken?: AuthToken;
}

export type AuthToken = string;
