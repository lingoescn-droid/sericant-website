import crypto from "crypto";
import { BriefProduct } from "./brief-products";

export type ScopeConfirmationPayload = {
  requestId: string;
  customerName: string;
  email: string;
  companyLegalName: string;
  product: BriefProduct;
  exp: number;
};

function base64url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

export function createScopeConfirmationToken(
  payload: Omit<ScopeConfirmationPayload, "exp">,
  secret: string
) {
  const fullPayload: ScopeConfirmationPayload = {
    ...payload,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  };
  const encoded = base64url(JSON.stringify(fullPayload));
  const signature = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyScopeConfirmationToken(token: string, secret: string) {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as ScopeConfirmationPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
