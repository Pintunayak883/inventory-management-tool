import React from "react";
import NewBrands from "../../new/page";
import { GetData } from "@/lib/getData";

// Define the type for the 'id' parameter
interface Params {
  id: string;
}

// Define the type for the fetched data (adjust this based on your data structure)
interface BrandData {
  id: string;
  title: string;
  abbreviation: string;
  // Add other fields as needed
}

interface UpdateBrandProps {
  params: Params; // params containing the 'id'
}

const UpdateBrand: React.FC<UpdateBrandProps> = async ({ params: { id } }) => {
  // Fetch data using the provided id
  const data: BrandData = await GetData(`warehouse/${id}`);
  console.log(data);

  return (
    <>
      {/* Pass the fetched data as initialData and set isUpdate to true */}
      <NewBrands initialData={data} isUpdate={true} />
    </>
  );
};

export default UpdateBrand;
