"use client";
import React from "react";
import SlideOver from "./slideover";
import Table from "../table";
import { Dialog } from "@headlessui/react";
import {
  XMarkIcon,
  PlusIcon,
  LinkIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Select from "./select";
import Button from "./button";
import CategoryForm from "./category-form";
import UnitForm from "./unit-form";
import { useForm } from "react-hook-form";
import { inventory } from "edge/interfaces";
import { useRouter } from "next/navigation";

function ProductsSlideOver({
  products,
  onFinishAdd,
}: {
  products: inventory.Product[];
  onFinishAdd?: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const [isCreatingCategory, setIsCreatingCategory] = React.useState(false);
  const [isCreatingUnit, setIsCreatingUnit] = React.useState(false);

  const { register, handleSubmit } = useForm();
  const router = useRouter();
  return (
    <>
      <Table
        items={products.map((p) => ({
          "Product Name": p.name,
          "Product Description": p.description || "No Description",
          Category: p.category.name || "Uncategorized",
          Unit: p.unit.name || "Uncategorized",
        }))}
        onItemPress={() => setOpen(true)}
        onActionPress={() => setOpen(true)}
      />
      <SlideOver open={open} setOpen={setOpen}>
        <form
          onSubmit={handleSubmit(async (data) => {
            const formData = new FormData();
            formData.append("product-name", data["product-name"]);
            formData.append("product-description", data["product-description"]);
            formData.append("category-name", data["category-name"]);
            formData.append(
              "category-description",
              data["category-description"]
            );
            formData.append("unit-name", data["unit-name"]);
            formData.append("unit-description", data["unit-description"]);

            const res = await fetch("/api/inventory/product", {
              method: "POST",
              body: formData,
            }).then((res) => res.json());
            onFinishAdd?.();
            router.refresh();
            setOpen(false);
          })}
          className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
        >
          <div className="flex-1">
            {/* Header */}
            <div className="bg-gray-50 px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between space-x-3">
                <div className="space-y-1">
                  <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                    New Product
                  </Dialog.Title>
                  <p className="text-sm text-gray-500">
                    Get started by filling in the information below to create
                    your new Product
                  </p>
                </div>
                <div className="flex h-7 items-center">
                  <button
                    type="button"
                    className="relative text-gray-400 hover:text-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider container */}
            <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
              {/* Project name */}
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                <div>
                  <label
                    htmlFor="product-name"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                  >
                    Product name
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    {...register("product-name")}
                    id="product-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Project description */}
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                <div>
                  <label
                    htmlFor="product-description"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                  >
                    Description
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    id="product-description"
                    {...register("product-description")}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                <div>
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Product Category
                  </h3>
                </div>
                <div className="sm:col-span-2">
                  {isCreatingCategory ? (
                    <CategoryForm register={register} />
                  ) : (
                    <div className="flex  space-x-2 gap-4 sm:flex-row flex-col items-start sm:items-center">
                      <Select placeholder="Select a category" options={[]} />
                      <span className="h-5 w-5 text-gray-400 group-hover:text-gray-500">
                        Or
                      </span>

                      <Button
                        onClick={() => setIsCreatingCategory(true)}
                        type="button"
                      >
                        Create new
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {/* Unit */}
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                <div>
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Unit of Measurement
                  </h3>
                </div>

                <div className="sm:col-span-2">
                  {isCreatingUnit ? (
                    <UnitForm register={register} />
                  ) : (
                    <div className="flex  space-x-2 gap-4 sm:flex-row flex-col items-start sm:items-center">
                      <Select placeholder="Select a category" options={[]} />
                      <span className="h-5 w-5 text-gray-400 group-hover:text-gray-500">
                        Or
                      </span>

                      <Button
                        onClick={() => setIsCreatingUnit(true)}
                        type="button"
                      >
                        Create new
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {/* Fields */}
              <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                <div>
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    Custom Fields
                  </h3>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="absolute -inset-2" />
                      <span className="sr-only">Add team member</span>
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <Button type="submit">Create</Button>
            </div>
          </div>
        </form>
      </SlideOver>
    </>
  );
}

export default ProductsSlideOver;
