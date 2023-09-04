"use client";
import {
  CalendarIcon,
  ChartPieIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  CalendarDaysIcon,
  HomeIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { classNames } from "./sidebar-layout";
import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: CalendarDaysIcon,
    current: true,
  },
  { name: "Point of Sale", href: "/pos", icon: HomeIcon, current: true },
  {
    name: "Accounting",
    icon: CurrencyDollarIcon,
    children: [
      { name: "Chart of Accounts", href: "/accounting/accounts" },
      { name: "Transactions", href: "/accounting/transactions" },
    ],
  },
  {
    name: "Inventory",
    icon: ArchiveBoxIcon,
    current: false,
    children: [
      { name: "Products", href: "/inventory/products" },
      { name: "Categories", href: "/inventory/categories" },
      { name: "Units", href: "/inventory/units" },
      { name: "History", href: "/inventory/history" },
    ],
  },
  {
    name: "User Management",
    icon: UserIcon,
    current: false,
    children: [
      { name: "Users", href: "/users/products" },
      { name: "Roles", href: "/users/categories" },
      { name: "Permissions", href: "/users/units" },
      { name: "History", href: "/users/history" },
    ],
  },
];

type Props = {
  onItemPress?: () => void;
};

function Navigation({ onItemPress }: Props) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => {
              let isActive = false;
              if (item.href) {
                isActive = pathname.startsWith(item.href);
              }
              return (
                <li key={item.name}>
                  {!item.children ? (
                    <Link
                      onClick={onItemPress}
                      href={item.href}
                      className={classNames(
                        isActive
                          ? "bg-indigo-700 text-white"
                          : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isActive
                            ? "text-white"
                            : "text-indigo-200 group-hover:text-white",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-indigo-200 hover:text-white hover:bg-indigo-700"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                isActive
                                  ? "text-white"
                                  : "text-indigo-200 group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                            <ChevronRightIcon
                              className={classNames(
                                open
                                  ? "rotate-90 text-gray-100"
                                  : "text-gray-100",
                                "ml-auto h-5 w-5 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>{" "}
                          <Transition
                            enter="transition duration-100 ease-out duration-150"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out duration-150"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel
                              as="ul"
                              className="mt-1 px-9 pl-9 "
                            >
                              {item.children.map((subItem) => {
                                isActive = pathname.startsWith(subItem.href);
                                return (
                                  <li key={subItem.name}>
                                    {/* 44px */}
                                    <Link
                                      onClick={onItemPress}
                                      href={subItem.href}
                                      className={classNames(
                                        isActive
                                          ? "bg-indigo-700 text-white "
                                          : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      )}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              );
            })}
          </ul>
        </li>

        <li className="mt-auto">
          <Link
            onClick={onItemPress}
            href="/settings"
            className={classNames(
              "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white",
              pathname.startsWith("/settings") ? "bg-indigo-700 text-white" : ""
            )}
          >
            <Cog6ToothIcon
              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
              aria-hidden="true"
            />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
