import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { GetData } from "@/lib/getData";

const Warehouse = async () => {
  const Warehouse = await GetData("warehouse");

  // Assuming Warehouse contain 'title' and 'description' fields
  const headings = [
    { key: "title", label: "Warehouse Title" },
    { key: "location", label: "Warehouse location" },
    { key: "description", label: "Warehouse description" },
    { key: "warehouseType", label: "WarehouseType" },
  ];

  return (
    <>
      {/* Header */}
      <FixedHeader
        title="Warehouse"
        newLink="/dashboard/Inventory/warehouse/new"
      />

      {/* Table */}
      <div className="my-4 p-8">
        <DataTable
          data={Warehouse}
          headings={headings}
          resourceTitle="warehouse"
        />
      </div>
    </>
  );
};

export default Warehouse;
