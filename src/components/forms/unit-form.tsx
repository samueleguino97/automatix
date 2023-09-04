import React from "react";

type Props = {
  register?: any;
};
function UnitForm({ register = () => {} }: Props) {
  return (
    <div>
      <div className=" px-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:px-0 sm:py-0">
        <div>
          <label
            htmlFor="unit-name"
            className=" sr-only block text-sm font-normal leading-6 text-gray-500 "
          >
            Unit Name
          </label>
        </div>
        <div className="sm:col-span-2">
          <input
            placeholder="Unit Name"
            type="text"
            {...register("unit-name")}
            id="unit-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className=" px-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:px-0 sm:py-5">
        <div>
          <label
            htmlFor="unit-description"
            className=" sr-only block text-sm font-normal leading-6 text-gray-500  "
          >
            Unit Description
          </label>
        </div>
        <div className="sm:col-span-2">
          <input
            placeholder="Unit Description"
            type="text"
            {...register("unit-description")}
            id="unit-description"
            className="block w-full rounded-md border-0 py-1.5 text-gray-500  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}

export default UnitForm;
