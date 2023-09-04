import { AuthCookieName } from "@/utils/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
//SINGOUT ROUTE
export async function GET() {
  const cookieStorage = cookies();
  cookieStorage.delete(AuthCookieName);
  redirect("/login");
}
