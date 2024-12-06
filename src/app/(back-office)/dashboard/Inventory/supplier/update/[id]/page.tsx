import React from "react";
import NewSupplier from "../../new/page";
import { GetData } from "@/lib/getData";

// Define the Supplier interface for type safety
interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Params {
  id: string;
}

const UpdateSupplier = async ({ params }: { params: Params }) => {
  // Fetch supplier data by id
  const data: Supplier = await GetData(`supplier/${params.id}`);
  console.log(data);

  return (
    <>
      <NewSupplier initialData={data} isUpdate={true} />
    </>
  );
};

export default UpdateSupplier;
