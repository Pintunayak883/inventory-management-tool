import React from "react";
import NewBrands from "../../new/page";
import { GetData } from "@/lib/getData";

// Define the type for the params
interface Params {
  id: string;
}

interface UpdateBrandProps {
  params: Params;
}

const UpdateBrand: React.FC<UpdateBrandProps> = async ({ params: { id } }) => {
  try {
    const data = await GetData(`brands/${id}`);
    console.log(data);

    return (
      <>
        <NewBrands initialData={data} isUpdate={true} />
      </>
    );
  } catch (error) {
    console.error("Error fetching brand data:", error);
    return (
      <div>
        <p>Error fetching brand data. Please try again later.</p>
      </div>
    );
  }
};

export default UpdateBrand;
