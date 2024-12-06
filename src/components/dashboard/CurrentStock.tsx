import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { GetData } from "@/lib/getData";

const CurrentStock = async ({
  items,
  title,
}: {
  title: string;
  items: string;
}) => {
  const headings = [
    { key: "imageUrl", label: " Image" },
    { key: "title", label: " Title" },
    { key: "sellingPrice", label: "Selling Price" },
  ];

  return (
    <>
      <div className="bg-pink-50 p-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {/* Table */}
        <div className="my-4 ">
          <DataTable data={items} headings={headings} resourceTitle="items" />
        </div>
      </div>
    </>
  );
};

export default CurrentStock;
