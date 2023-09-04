import Table from "@/components/table";
import React from "react";
import * as edgedb from "edgedb";
import { getSession } from "@/utils/cookies";
import { cookies } from "next/headers";
import ProductsSlideOver from "@/components/forms/products-slide";
import { getProducts } from "@/utils/inventory";
import { revalidatePath } from "next/cache";
async function ProductsPage() {
  const session = getSession({ cookies });

  const products = await getProducts(session?.tenantid || "");
  return (
    <div>
      <ProductsSlideOver products={products} />
    </div>
  );
}

export default ProductsPage;
