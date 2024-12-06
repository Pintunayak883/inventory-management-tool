import React from "react";
import NewBrands from "../../new/page";
import { GetData } from "@/lib/getData";
import NewUnits from "../../new/page";

const UpdateBrand = async ({ params: { id } }) => {
  const data = await GetData(`units/${id}`);
  console.log(data);
  return (
    <>
      <NewUnits initialData={data} isUpdate={true} />
    </>
  );
};

export default UpdateBrand;
