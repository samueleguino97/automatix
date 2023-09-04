import {
  getUserData,
  signUserToken,
  validateUsernameAndPassword,
} from "@/utils/auth";
import { cookies } from "next/headers";
import { AuthCookieName, getSession } from "@/utils/cookies";

export async function POST(request: Request) {
  //register new admin user and tenant in the database
  const session = getSession({ cookies });

  const isLoggedInAndAdmin = session?.systemroleid === "Admin";
  if (!isLoggedInAndAdmin) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
}
