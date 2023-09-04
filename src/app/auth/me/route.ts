import {
  getAuthCookie,
  getUserData,
  getUserFromToken,
  signUserToken,
  validateUsernameAndPassword,
} from "@/utils/auth";
import { AuthCookieName } from "@/utils/cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const jwtToken = cookieStore.get(AuthCookieName);
    if (!jwtToken) return new Response("No token found", { status: 401 });

    if (jwtToken.value === "anon")
      return new Response("No token found", { status: 401 });
    if (!jwtToken.value) return new Response("No token found", { status: 401 });

    const user = await getUserFromToken(jwtToken.value);
    return NextResponse.json(user);
  } catch (error) {
    return new Response("Error parsing data", {
      status: 500,
    });
  }
}
