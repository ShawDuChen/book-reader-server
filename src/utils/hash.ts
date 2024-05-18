import { createHash as hashFunc } from "crypto";

const salt = `8qwezmnweoiuhjaksdqwetyfwhasvd283324qwe`;

export const createHash = (data: string) => {
  const saltData = `${salt}${data}`;
  return hashFunc("sha256").update(saltData).digest("hex");
};
