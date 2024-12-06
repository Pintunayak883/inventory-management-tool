import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { GetData } from "@/lib/getData";

// Define a type for the item object to ensure correct types
interface Item {
  imageUrl: string;
  title: string;
  sellingPrice: number;
}

const Items = async () => {
  let items: Item[] = [];
  try {
    items = await GetData("items");
  } catch (error) {
    console.error("Error fetching items data:", error);
    // Optionally, display a toast notification for error handling
  }

  // Define table headings
  const headings = [
    { key: "imageUrl", label: "Image" },
    { key: "title", label: "Title" },
    { key: "sellingPrice", label: "Selling Price" },
  ];

  // Handle case when no items are available
  if (items.length === 0) {
    return (
      <div className="my-4 p-8">
        <FixedHeader title="Items" newLink="/dashboard/Inventory/items/new" />
        <div className="text-center text-gray-500">No items available</div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <FixedHeader title="Items" newLink="/dashboard/Inventory/items/new" />

      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={items} headings={headings} resourceTitle="items" />
      </div>
    </>
  );
};

export default Items;
