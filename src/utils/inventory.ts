import { dbClient } from "@/db";
import { inventory } from "edge/interfaces";
export async function createProduct({
  productData,
  categoryData,
  unitData,
  tenantId,
}: {
  productData: Omit<
    inventory.Product,
    "id" | "tenant" | "unit" | "category"
  > & {
    categoryId?: string;
    unitId?: string;
  };
  categoryData?: Omit<inventory.Category, "id" | "tenant" | "products">;
  unitData?: Omit<inventory.Unit, "id" | "tenant">;
  tenantId?: string;
}) {
  await dbClient.transaction(async (tx) => {
    let cat = productData.categoryId;
    let unitId = productData.unitId;
    if (categoryData) {
      const newCat = await tx.querySingle<inventory.Category>(
        `
            insert inventory::Category {
                tenant := (select auth::Tenant filter .id = <uuid>$tenantId),
                name:= <str>$name,
                description:= <str>$description,
            }
        `,
        {
          tenantId: tenantId,
          name: categoryData.name,
          description: categoryData.description,
        }
      );
      cat = newCat?.id;
    }

    if (unitData) {
      const newUnit = await tx.querySingle<inventory.Unit>(
        `

            insert inventory::Unit {
                tenant := (select auth::Tenant filter .id = <uuid>$tenantId),
                name:= <str>$name,
                description:= <str>$description,
            }
            `,
        {
          tenantId: tenantId,

          name: unitData.name,
          description: unitData.description,
        }
      );
      unitId = newUnit?.id;
    }

    await tx.execute(
      `
            insert inventory::Product {
                name:= <str>$name,
                description:= <str>$description,
                category:= (select inventory::Category filter .id = <uuid>$cat),
                unit:= (select inventory::Unit filter .id = <uuid>$unitId),
                tenant := (select auth::Tenant filter .id = <uuid>$tenantId),


            }
        
        `,
      {
        name: productData.name,
        description: productData.description,
        cat: cat,
        unitId: unitId,
        tenantId: tenantId,
      }
    );
  });
  return true;
}

export async function getProducts(tenantId: string) {
  const products = await dbClient.query<inventory.Product>(
    `
    select inventory::Product {
        id,
        name,
        description,
        category: {
            id,
            name,
            description
        },
        unit: {
            id,
            name,
            description
        }
    }
    filter .tenant.id = <uuid>$tenantId
    order by .created_at desc
    `,
    { tenantId }
  );
  return products;
}
