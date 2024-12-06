import React from "react";
import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { GetData } from "@/lib/getData";

// Define the type for the Brand data
interface Brand {
  title: string;
  description?: string; // Optional, in case description is missing
}

interface BrandsProps {
  brands: Brand[];
}

const Brands: React.FC = async () => {
  try {
    const brands: Brand[] = await GetData("brands");

    // Define table headings
    const headings = [{ key: "title", label: "Brands Title" }];

    return (
      <>
        {/* Header */}
        <FixedHeader title="Brands" newLink="/dashboard/Inventory/brands/new" />

        {/* Table */}
        <div className="my-4 p-8">
          <DataTable data={brands} headings={headings} resourceTitle="brands" />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching brands data:", error);
    return <div>Error loading data</div>;
  }
};

export default Brands;
