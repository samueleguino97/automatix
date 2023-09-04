/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "@/utils/classNames";

type Props<T> = {
  value?: T;
  onChange?: (value: T) => void;
  displayValue?: (value: T) => string;
  options: T[];
  filterFunction?: (value: T, query: string) => boolean;
  placeholder?: string;
};

export default function Select<T extends { id: string; label: string }>({
  value,
  onChange,
  displayValue,
  options,
  filterFunction,
  placeholder,
}: Props<T>) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((v) => {
          if (!filterFunction) return true;
          return filterFunction(v, query);
        });

  return (
    <Combobox className="flex-1" as="div" value={value} onChange={onChange}>
      <div className="relative flex-1">
        <Combobox.Input
          placeholder={placeholder}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={displayValue}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((v) => (
              <Combobox.Option
                key={v.id}
                value={v}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <span
                        className={classNames(
                          "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                          //   v.online ? "bg-green-400" : "bg-gray-200"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected ? "font-semibold" : ""
                        )}
                      >
                        {v.label}
                        <span className="sr-only">
                          {" "}
                          {/* is {v.online ? "online" : "offline"} */}
                        </span>
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
