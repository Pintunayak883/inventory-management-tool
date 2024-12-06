import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { GetData } from "@/lib/getData";

const Categories = async () => {
  const categories = await GetData("categories");

  // Assuming categories contain 'title' and 'description' fields
  const headings = [
    { key: "title", label: "Category Title" },
    { key: "description", label: "Category Description" },
  ];

  return (
    <>
      {/* Header */}
      <FixedHeader
        title="Categories"
        newLink="/dashboard/Inventory/categories/new"
      />

      {/* Table */}
      <div className="my-4 p-8">
        <DataTable
          data={categories}
          headings={headings}
          resourceTitle={"categories"}
        />
      </div>
    </>
  );
};

export default Categories;
