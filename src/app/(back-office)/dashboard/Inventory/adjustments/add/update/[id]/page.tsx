import React from "react";
import { GetData } from "@/lib/getData";
import NewAddAdjustments from "../../new/page";

interface UpdateAdjustmentsProps {
  params: {
    id: string;
  };
}

const UpdateAdjustments = async ({
  params: { id },
}: UpdateAdjustmentsProps) => {
  const addAdjustments = await GetData(`adjustments/add/${id}`);

  return (
    <NewAddAdjustments
      initialData={{
        ...addAdjustments,
        id: id,
      }}
    />
  );
};

export default UpdateAdjustments;
