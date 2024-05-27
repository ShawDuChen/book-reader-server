import type { Request } from "express";

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
  nickname?: string;
}

export interface CrawlInfo {
  fetch_url: string;
  book_name?: string;
  author_name?: string;
  offset?: number;
}

export interface TokenRequest extends Request {
  user?: TokenUser;
}

export interface UpdatePasswordData {
  password: string;
  confirm_password: string;
}

export interface CodeColumn {
  dataIndex: string;
  title: string;
  searchable: boolean;
  changed: boolean;
  type: string;
  maxlength?: string;
}
