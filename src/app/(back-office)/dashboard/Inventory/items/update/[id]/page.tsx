import React from "react";
import { GetData } from "@/lib/getData";
import NewItem from "../../new/page";

// Define types for the item data structure
interface Item {
  id: string;
  title: string;
  description: string;
  sellingPrice: number;
  imageUrl: string;
  // Add any other fields you need here
}

interface Params {
  id: string;
}

const UpdateItem = async ({ params }: { params: Params }) => {
  const data: Item = await GetData(`items/${params.id}`);
  console.log(data);

  return (
    <>
      <NewItem initialData={data} isUpdate={true} />
    </>
  );
};

export default UpdateItem;
