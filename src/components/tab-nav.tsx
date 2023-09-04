"use client";
import { useTenantData } from "@/app/Context";
import { classNames } from "@/utils/classNames";
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon,
  CakeIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { name: "My Account", href: "/settings/me", icon: UserIcon, current: false },
  {
    name: "Company",
    href: "/settings/company",
    icon: BuildingOfficeIcon,
    current: false,
  },
  {
    name: "Platform",
    href: "/settings/platform",
    icon: UsersIcon,
    current: true,
  },
  {
    name: "Billing",
    href: "/settings/billing",
    icon: CreditCardIcon,
    current: false,
  },
  {
    name: "Add-ons",
    href: "/settings/adons",
    icon: CakeIcon,
    current: false,
  },
];

export default function TabNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const tenant = useTenantData();
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          onChange={(event) => {
            router.push(event.target.value);
          }}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option value={tab.href} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const isCurrent = pathname.includes(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    isCurrent
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                  style={{
                    borderColor: isCurrent
                      ? tenant.tenant_metadata?.tenant_main_color || ""
                      : "",
                  }}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <tab.icon
                    style={{
                      color: isCurrent
                        ? tenant.tenant_metadata?.tenant_main_color || ""
                        : "",
                    }}
                    className={classNames(
                      isCurrent
                        ? "text-indigo-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      color: isCurrent
                        ? tenant.tenant_metadata?.tenant_main_color || ""
                        : "",
                    }}
                  >
                    {tab.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
