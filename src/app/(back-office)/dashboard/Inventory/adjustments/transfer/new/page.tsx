"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInputs from "@/components/FormInputs/TextareaInputs";
import TextInput from "@/components/FormInputs/TextInput";
import { GetData } from "@/lib/getData";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Warehouse {
  id: string;
  title: string;
}

interface Item {
  id: string;
  title: string;
}

interface FormData {
  referenceNumber: string;
  transferStockQty: string | number;
  notes: string;
  givingWarehouseId: string;
  receivingWarehouseId: string;
  itemId: string;
}

interface FormErrors {
  referenceNumber?: string;
  transferStockQty?: string;
  notes?: string;
  givingWarehouseId?: string;
  receivingWarehouseId?: string;
  itemId?: string;
}

interface NewTransferAdjustmentsProps {
  initialData?: Partial<FormData> & { id?: string };
  isUpdate?: boolean;
}

const NewTransferAdjustments: React.FC<NewTransferAdjustmentsProps> = ({
  initialData = {},
  isUpdate = false,
}) => {
  const baseUrl = "http://localhost:3000";
  const [items, setItems] = useState<Item[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [formData, setFormData] = useState<FormData>({
    referenceNumber: initialData.referenceNumber || "",
    transferStockQty: initialData.transferStockQty || "",
    notes: initialData.notes || "",
    givingWarehouseId: initialData.givingWarehouseId || "",
    receivingWarehouseId: initialData.receivingWarehouseId || "",
    itemId: initialData.itemId || "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedItems = await GetData("items");
        const fetchedWarehouses = await GetData("warehouse");
        setItems(fetchedItems);
        setWarehouses(fetchedWarehouses);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, [initialData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.referenceNumber)
      errors.referenceNumber = "Reference number is required.";
    if (!formData.transferStockQty)
      errors.transferStockQty = "Stock quantity is required.";
    if (!formData.notes) errors.notes = "Notes are required.";
    if (!formData.givingWarehouseId)
      errors.givingWarehouseId = "Giving warehouse is required.";
    if (!formData.receivingWarehouseId)
      errors.receivingWarehouseId = "Receiving warehouse is required.";
    if (formData.givingWarehouseId === formData.receivingWarehouseId) {
      errors.receivingWarehouseId =
        "Giving and receiving warehouses must be different.";
    }
    if (!formData.itemId) errors.itemId = "Item selection is required.";
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const endpoint = isUpdate
        ? `${baseUrl}/api/adjustments/transfer/${initialData.id}`
        : `${baseUrl}/api/adjustments/transfer`;
      await axios[isUpdate ? "put" : "post"](endpoint, formData);
      toast.success(
        isUpdate
          ? "Transfer Stock Updated Successfully."
          : "Stock Transfer Successfully."
      );
      router.push("/dashboard/Inventory/adjustments");
      router.refresh();
      handleReset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      referenceNumber: "",
      transferStockQty: "",
      notes: "",
      givingWarehouseId: "",
      receivingWarehouseId: "",
      itemId: "",
    });
    setFormErrors({});
  };

  return (
    <>
      <FormHeader
        title={isUpdate ? "Update Transfer Stock" : "New Transfer Stock"}
        href={"/dashboard/Inventory/adjustments"}
      />
      <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <TextInput
                label="Reference Number"
                name="referenceNumber"
                type="number"
                value={formData.referenceNumber}
                onChange={handleInputChange}
                placeholder="Enter Reference Number"
                error={formErrors.referenceNumber}
              />
            </div>
            <div className="w-1/2">
              <SelectInput
                name="itemId"
                label="Select the Item"
                options={items}
                value={formData.itemId}
                onChange={handleInputChange}
                error={formErrors.itemId}
              />
            </div>
          </div>

          <TextInput
            label="Quantity of Stock to Transfer"
            name="transferStockQty"
            type="number"
            value={formData.transferStockQty}
            onChange={handleInputChange}
            placeholder="Enter Stock Quantity"
            error={formErrors.transferStockQty}
          />

          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <SelectInput
                name="givingWarehouseId"
                label="Select the Warehouse Giving the Stock"
                options={warehouses}
                value={formData.givingWarehouseId}
                onChange={handleInputChange}
                error={formErrors.givingWarehouseId}
              />
            </div>
            <div className="w-1/2">
              <SelectInput
                name="receivingWarehouseId"
                label="Select the Warehouse Receiving the Stock"
                options={warehouses}
                value={formData.receivingWarehouseId}
                onChange={handleInputChange}
                error={formErrors.receivingWarehouseId}
              />
            </div>
          </div>

          <TextareaInputs
            label="Adjustment Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Enter Notes for Adjustment"
            error={formErrors.notes}
          />

          <SubmitButton
            loading={loading}
            title={isUpdate ? "Update Transfer Stock" : "New Transfer Stock"}
          />
        </form>
      </div>
    </>
  );
};

export default NewTransferAdjustments;
