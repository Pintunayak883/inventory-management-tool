import { useEffect, useState } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import CreatedItemForm from "@/components/dashboard/CreatedItemform";
import { GetData } from "@/lib/getData";

// Define types for API data
interface Category {
  id: string;
  title: string;
}

interface Unit {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  title: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface Warehouse {
  id: string;
  location: string;
}

interface Item {
  id?: string;
  title: string;
  description: string;
  sellingPrice: number;
  categoryId: string;
  unitId: string;
  brandId: string;
  supplierId: string;
  warehouseId: string;
  imageUrl: string;
}

interface NewItemProps {
  initialData?: Item;
  isUpdate?: boolean;
}

const NewItem = async ({
  initialData = {},
  isUpdate = false,
}: NewItemProps) => {
  const categoriesData = GetData("categories") || [];
  const unitsData = GetData("units") || [];
  const brandsData = GetData("brands") || [];
  const suppliersData = GetData("suppliers") || [];
  const warehousesData = GetData("warehouses") || [];

  const [categories, units, brands, suppliers, warehouses] = await Promise.all([
    categoriesData,
    unitsData,
    brandsData,
    suppliersData,
    warehousesData,
  ]);

  return (
    <>
      <FormHeader
        title={isUpdate ? "Update Item" : "New Item"}
        href="/dashboard/Inventory/items"
      />
      <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <CreatedItemForm
          categories={categories}
          units={units}
          brands={brands}
          suppliers={suppliers}
          warehouses={warehouses}
          initialData={initialData}
          isUpdate={isUpdate}
        />
      </div>
    </>
  );
};

export default NewItem;
