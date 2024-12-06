import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { GetData } from "@/lib/getData";

const Adjustments = async () => {
  const addAdjustments = await GetData("adjustments/add");
  const transferAdjustments = await GetData("adjustments/transfer");

  // Assuming Adjustments contain 'title' and 'description' fields
  const AddHeadings = [
    { key: "referenceNumber", label: " ReferenceNumber" },
    { key: "addStockQty", label: " StockQty" },
  ];
  const TransferHeadings = [
    { key: "referenceNumber", label: " ReferenceNumber" },
    { key: "transferStockQty", label: " StockQty" },
  ];

  return (
    <>
      {/* Header */}
      <FixedHeader
        title="Adjustments"
        newLink="/dashboard/Inventory/adjustments/new"
      />

      {/* Table */}
      <div className="my-4 p-8">
        <h2 className="py-4 text-xl font-semibold">
          {" "}
          Stock Increments Adjustments
        </h2>
        <DataTable
          data={addAdjustments}
          headings={AddHeadings}
          resourceTitle={"add"}
        />
      </div>
      <div className="my-4 p-8">
        <h2 className="py-4 text-xl font-semibold">
          {" "}
          Stock Transfer Adjustments
        </h2>
        <DataTable
          data={transferAdjustments}
          headings={TransferHeadings}
          resourceTitle={"transfer"}
        />
      </div>
    </>
  );
};

export default Adjustments;
