export type PageQuery<T = unknown> = {
  page: number;
  limit: number;
} & T;

export interface TokenUser {
  username: string;
  roles: string[];
  expiresIn: number;
  iat: number;
  exp: number;
}
