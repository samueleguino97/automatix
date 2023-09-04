import React from "react";

type Props = {
  register?: any;
};
function CategoryForm({ register = () => {} }: Props) {
  return (
    <div>
      <div className=" px-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:px-0 sm:py-0">
        <div>
          <label
            htmlFor="category-name"
            className=" sr-only block text-sm font-normal leading-6 text-gray-500 "
          >
            Category Name
          </label>
        </div>
        <div className="sm:col-span-2">
          <input
            {...register("category-name")}
            placeholder="Category Name"
            type="text"
            name="category-name"
            id="category-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className=" px-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:px-0 sm:py-5">
        <div>
          <label
            htmlFor="category-name"
            className=" sr-only block text-sm font-normal leading-6 text-gray-500  "
          >
            Category Description
          </label>
        </div>
        <div className="sm:col-span-2">
          <input
            {...register("category-description")}
            placeholder="Category Description"
            type="text"
            name="category-name"
            id="category-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-500  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryForm;
