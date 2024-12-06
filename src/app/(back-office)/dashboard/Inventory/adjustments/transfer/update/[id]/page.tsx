"use client";
import React from "react";
import NewTransferAdjustments from "../../new/page";
import { GetData } from "@/lib/getData";

interface UpdateTransferAdjustmentsProps {
  params: {
    id: string;
  };
}

const UpdateTransferAdjustments: React.FC<
  UpdateTransferAdjustmentsProps
> = async ({ params: { id } }) => {
  const transferAdjustments = await GetData(`adjustments/transfer/${id}`);

  return (
    <>
      <NewTransferAdjustments
        initialData={transferAdjustments}
        isUpdate={true}
      />
    </>
  );
};

export default UpdateTransferAdjustments;
