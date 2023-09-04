import jwt from "jsonwebtoken";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { JwtUser } from "./auth";
import { auth } from "../../dbschema/interfaces";
import { dbClient } from "@/db";
export const AuthCookieName = "tkn";

export const jwtsecret = "wrong-secret";

export function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, jwtsecret);
    return decoded;
  } catch (err) {
    return null;
  }
}
export function getUserFromToken(token: string | undefined): JwtUser | null {
  if (!token) return null;
  if (token === "anon") return null;
  const decoded = jwt.verify(token, jwtsecret);
  if (decoded) {
    return decoded as JwtUser;
  }
  return null;
}

export function getSession({
  cookies,
}: {
  cookies: () => ReadonlyRequestCookies;
}) {
  const cookieStore = cookies();
  let jwtCookie = cookieStore.get(AuthCookieName);
  const jwtToken = jwtCookie?.value;
  return getUserFromToken(jwtToken);
}

export async function getTenantData(tenantId?: string) {
  if (!tenantId) return null;
  const tenantData = await dbClient.querySingle<auth.Tenant>(
    `
          select auth::Tenant {**}
          filter .id = <uuid>$tenantId
          limit 1
        
        `,
    { tenantId }
  );
  return tenantData;
}
