import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { GetData } from "@/lib/getData";

// Define the type for a single Unit
interface Unit {
  id: string; // Assuming you have an id for each unit, adjust accordingly
  title: string;
  abbreviation: string;
}

const Units = async () => {
  // Fetch data and type it as an array of Unit
  const units: Unit[] = await GetData("units");

  // Define table headings
  const headings = [
    { key: "title", label: "Units Title" },
    { key: "abbreviation", label: "Units Abbreviation" },
  ];

  return (
    <>
      {/* Header */}
      <FixedHeader title="Units" newLink="/dashboard/Inventory/units/new" />

      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={units} headings={headings} resourceTitle={"units"} />
      </div>
    </>
  );
};

export default Units;
