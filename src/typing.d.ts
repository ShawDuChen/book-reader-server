import type { Request } from "express";

export type PageQuery<T = unknown> = {
  page: number;
  limit: number;
} & T;

export interface TokenUser {
  user_id: number;
  username: string;
  role: string;
  is_super: string;
  expiresIn: number;
  iat: number;
  exp: number;
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

export enum CommentType {
  author = "author",
  book = "book",
  chapter = "chapter",
}
