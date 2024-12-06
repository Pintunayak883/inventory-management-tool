import FixedHeader from "@/components/dashboard/FixedHeader";
import DataTable from "@/components/dashboard/DataTable";
import { GetData } from "@/lib/getData";
import React, { useEffect, useState } from "react";

// Define the Supplier interface for type safety
interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const Supplier = async () => {
  const headings = [
    { key: "name", label: "Supplier Name" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Email Address" },
  ];

  // Fetching data from API and typing it as Supplier[]
  const data: Supplier[] = await GetData("supplier");

  return (
    <>
      {/* Header */}
      <FixedHeader
        title="Suppliers"
        newLink="/dashboard/Inventory/supplier/new"
      />
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={data} headings={headings} resourceTitle="supplier" />
      </div>
    </>
  );
};

export default Supplier;
