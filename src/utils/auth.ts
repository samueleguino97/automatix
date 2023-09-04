import { dbClient } from "@/db";
import crypto from "node:crypto";
import { auth } from "../../dbschema/interfaces";
import { AuthCookieName, jwtsecret } from "./cookies";
import jwt from "jsonwebtoken";

export type JwtUser = {
  username: string;
  uid: string;
  tenantid?: string;
  tenantname?: string;
  roleid?: string;
  systemroleid?: auth.UserRole;
};

export async function validateUsernameAndPassword(
  username: string,
  password: string
) {
  let isValid = false;

  const user = await getUserSaltAndPassword(username);
  if (!user) {
    return isValid;
  }

  const hashedPassword = hashPassword(password, user.salt);
  if (hashedPassword.hash === user.password) {
    isValid = true;
  }
  return isValid;
}

export async function signUserToken(user: auth.User) {
  const token = jwt.sign(
    {
      username: user?.username,
      uid: user?.id,
      roleid: user?.employee_role?.id,
      systemroleid: user?.user_role,
      tenantid: user?.tenant.id,
      tenantname: user?.tenant.name,
    },
    jwtsecret
  );
  return token;
}

export async function getUserFromToken(token: string) {
  const decodedToken = jwt.verify(token, jwtsecret) as JwtUser;
  console.log(decodedToken);
  const user = await getUserData(decodedToken.username);
  return user;
}

export function getAuthCookie(value: string) {
  return {
    name: AuthCookieName,
    value: value,
    path: "/",
  };
}

export async function getUserData(username: string) {
  const user = await dbClient.querySingle<auth.User>(
    `
          select auth::User {
            id,
            name,
            username,
            tenant: {
                id,
                name
            },
            employee_role: {
                id,
                name
            },
            user_role
          }
          filter .username = <str>$username
          limit 1
        
        `,
    { username }
  );
  return user;
}

async function getUserSaltAndPassword(username: string) {
  const user = await dbClient.querySingle<auth.User>(
    `
      select auth::User {
        salt,
        password
      }
      filter .username = <str>$username
      limit 1

    `,
    { username }
  );
  return user;
}

export function hashPassword(password: string, salt?: string) {
  const generatedSalt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt ? salt : generatedSalt, 1000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt ? salt : generatedSalt,
    hash,
  };
}
