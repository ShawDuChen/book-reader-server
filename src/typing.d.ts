export type PageQuery<T = unknown> = {
  page: number;
  limit: number;
} & T;

export interface TokenUser {
  username: string;
  role: string;
  is_super: string;
  expiresIn: number;
  iat: number;
  exp: number;
}

export interface CredentialsParams {
  username: string;
  password: string;
}

export interface CrawlInfo {
  fetch_url: string;
  book_name: string;
  author_name: string;
  offset?: number;
}
