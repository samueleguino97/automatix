"use client";
import { classNames } from "@/utils/classNames";

const products = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

type Props<T> = {
  onItemPress?: (item: T) => void;
  onActionPress?: () => void;
  items: T[];
  actionText?: string;
};

export default function Table<T extends Record<string, string>>({
  onItemPress,
  onActionPress,
  items,
  actionText,
}: Props<T>) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of your businesses products in the inventory
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={onActionPress}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {actionText || "Add Product"}
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0 ">
              <thead>
                <tr>
                  {Object.keys(items?.[0]).map((key, idx) => {
                    return (
                      <th
                        scope="col"
                        className={classNames(
                          idx === 0 ? "" : "hidden sm:table-cell",
                          "sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                        )}
                      >
                        {key}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {items.map((item, productIdx) => (
                  <tr
                    key={item.id}
                    onClick={() => onItemPress?.(item)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    {Object.keys(item).map((key, idx) => {
                      return (
                        <td
                          className={classNames(
                            "whitespace-nowrap py-4  pl-4 pr-3 cursor-pointer text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 ",
                            idx === 0 ? "" : "hidden sm:table-cell"
                          )}
                        >
                          {item[key]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
