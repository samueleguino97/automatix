"use client";
import { useEffect } from "react";
import { map } from "nanostores";
import { useStore } from "@nanostores/react";
import { auth } from "../../dbschema/interfaces";
import { JwtUser } from "@/utils/auth";

export const userStore = map<JwtUser>();
export const tenantStore = map<auth.Tenant>();

export function Provider({
  children,
  userData,
  tenantData,
}: {
  children: React.ReactNode;
  userData: any;
  tenantData: auth.Tenant | null;
}) {
  useEffect(() => {
    userStore.set(userData);
  }, [userData]);

  useEffect(() => {
    if (!tenantData) return console.log("no tenant data");
    tenantStore.set(tenantData);
  }, [tenantData]);

  return <>{children}</>;
}

export function useSession() {
  const session = useStore(userStore);
  return session;
}

export function useTenantData() {
  const tenantData = useStore(tenantStore);
  return tenantData;
}
