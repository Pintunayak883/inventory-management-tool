import React from "react";
import { GetData } from "@/lib/getData";
import NewAddAdjustments from "../../new/page";

interface UpdateAdjustmentsProps {
  params: {
    id: string;
  };
}

const UpdateAdjustments: React.FC<UpdateAdjustmentsProps> = async ({
  params: { id },
}) => {
  // Fetch adjustment data by ID
  const addAdjustments = await GetData(`adjustments/add/${id}`);

  return <NewAddAdjustments initialData={addAdjustments} isUpdate={true} />;
};

export default UpdateAdjustments;
