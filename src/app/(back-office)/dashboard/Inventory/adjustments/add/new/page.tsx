"use client";
import React, { useEffect, useState } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInputs from "@/components/FormInputs/TextareaInputs";
import TextInput from "@/components/FormInputs/TextInput";
import { GetData } from "@/lib/getData";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface InitialData {
  id?: string;
  referenceNumber?: string;
  addStockQty?: number;
  notes?: string;
  receivingWarehouseId?: string;
  itemId?: string;
}

export interface NewAddAdjustmentsProps {
  initialData?: InitialData;
}

export default function NewAddAdjustments({
  initialData,
}: NewAddAdjustmentsProps) {
  const [items, setItems] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    referenceNumber: initialData?.referenceNumber || "",
    addStockQty: initialData?.addStockQty?.toString() || "",
    notes: initialData?.notes || "",
    receivingWarehouseId: initialData?.receivingWarehouseId || "",
    selectitem: initialData?.itemId || "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedItems = await GetData("items");
        const fetchedWarehouses = await GetData("warehouse");

        setItems(fetchedItems);
        setWarehouses(fetchedWarehouses);

        // Ensure default selections if not provided in initial data
        setFormData((prevData) => ({
          ...prevData,
          selectitem: initialData?.itemId || fetchedItems[0]?.id || "",
          receivingWarehouseId:
            initialData?.receivingWarehouseId || fetchedWarehouses[0]?.id || "",
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading data for form.");
      }
    };

    fetchData();
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.referenceNumber)
      errors.referenceNumber = "Reference number is required.";
    if (!formData.addStockQty)
      errors.addStockQty = "Stock quantity is required.";
    if (!formData.notes) errors.notes = "Notes are required.";
    if (!formData.receivingWarehouseId)
      errors.receivingWarehouseId = "Warehouse selection is required.";
    if (!formData.selectitem) errors.selectitem = "Item selection is required.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        addStockQty: parseInt(formData.addStockQty, 10),
        itemId: formData.selectitem,
      };

      // Check if it's an update or create scenario
      if (initialData?.id) {
        // Update existing record
        await axios.put(
          `http://localhost:3000/api/adjustments/add/${initialData.id}`,
          dataToSend
        );
        toast.success("Stock updated successfully.");
      } else {
        // Create new record
        await axios.post(
          `http://localhost:3000/api/adjustments/add`,
          dataToSend
        );
        toast.success("New stock added successfully.");
      }

      router.push("/dashboard/Inventory/adjustments");
      router.refresh();
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormHeader
        title={initialData?.id ? "Update Add Stock" : "New Add Stock"}
        href={"/dashboard/Inventory/adjustments"}
      />
      <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <TextInput
                label="Reference Number"
                name="referenceNumber"
                type="text"
                value={formData.referenceNumber}
                onChange={handleInputChange}
                placeholder="Enter Reference Number"
                error={formErrors.referenceNumber}
              />
            </div>
            <div className="w-1/2">
              <SelectInput
                name="selectitem"
                label="Select the Item"
                options={items}
                value={formData.selectitem}
                onChange={handleInputChange}
                error={formErrors.selectitem}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <TextInput
                label="Amount Quantity of Stock to Add"
                name="addStockQty"
                type="number"
                value={formData.addStockQty}
                onChange={handleInputChange}
                placeholder="Enter Amount of Stock"
                error={formErrors.addStockQty}
              />
            </div>
            <div className="w-1/2">
              <SelectInput
                name="receivingWarehouseId"
                label="Select the Warehouse"
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
            placeholder="Enter Adjustment Notes"
            error={formErrors.notes}
          />
          <SubmitButton
            loading={loading}
            title={initialData?.id ? "Update Add Stock" : "New Add Stock"}
          />
        </form>
      </div>
    </>
  );
}
