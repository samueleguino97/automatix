import SidebarLayout from "@/components/sidebar-layout";
import { getSession, getTenantData } from "@/utils/cookies";
import { cookies } from "next/headers";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { Provider } from "../Context";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = getSession({ cookies });
  const tenantData = await getTenantData(session?.tenantid);

  if (!session) {
    //redirect
    redirect(`/login?redirect=/dashboard`);
  }

  if (!tenantData?.active) {
    redirect(`/inactive`);
  }

  return (
    <SidebarLayout>
      <Provider tenantData={tenantData} userData={session}>
        {children}
      </Provider>
    </SidebarLayout>
  );
}

export default Layout;
