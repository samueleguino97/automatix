import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const AuthCookieName = "tkn";
interface DecodedToken {
  username: string;
  uid: string;
  tenantid?: string;
}

export interface NextRequestWithSession extends NextRequest {
  session: DecodedToken | undefined | string;
}

export function middleware(request: NextRequestWithSession) {
  let jwtCookie = request.cookies.get(AuthCookieName);
  const jwtToken = jwtCookie?.value;
  const res = NextResponse.next();

  if (jwtToken) {
    res.cookies.set({
      name: AuthCookieName,
      value: jwtToken,
      path: "/",
    });
  } else {
    res.cookies.set({
      name: AuthCookieName,
      value: "anon",
      path: "/",
    });
  }
  return res;
}
