import { getSession } from "@/utils/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const session = getSession({ cookies });

  if (!!session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}

export default Layout;
