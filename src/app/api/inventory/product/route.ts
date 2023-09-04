import { getSession } from "@/utils/cookies";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createProduct } from "@/utils/inventory";
import { revalidatePath } from "next/cache";
export async function POST(request: NextRequest) {
  //create product
  const session = getSession({ cookies });
  const formData = await request.formData();

  const productData = {
    name: formData.get("product-name") as string,
    description: formData.get("product-description") as string,
    categoryId: formData.get("category-id") as string,
    unitId: formData.get("unit-id") as string,
  };
  const categoryData = {
    name: formData.get("category-name") as string,
    description: formData.get("category-description") as string,
  };
  const unitData = {
    name: formData.get("unit-name") as string,
    description: formData.get("unit-description") as string,
  };

  await createProduct({
    productData,
    categoryData,
    unitData,
    tenantId: session?.tenantid,
  });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
