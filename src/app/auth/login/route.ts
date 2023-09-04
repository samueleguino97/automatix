import {
  getUserData,
  signUserToken,
  validateUsernameAndPassword,
} from "@/utils/auth";
import { AuthCookieName } from "@/utils/cookies";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const reqUrl = new URL(request.url);
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (!username || !password) {
    return new Response("Username or password not provided", {
      status: 401,
    });
  }
  const isValid = validateUsernameAndPassword(
    username?.toString() || "",
    password?.toString() || ""
  );

  if (!isValid) {
    return new Response("Invalid username or password", {
      status: 401,
    });
  }

  const user = await getUserData(username?.toString() || " ");
  if (!user) {
    return new Response("User not found", {
      status: 404,
    });
  }
  const token = await signUserToken(user);
  revalidatePath("/");
  cookies().set(AuthCookieName, token, { path: "/" });
  return new Response("Logged in", {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
