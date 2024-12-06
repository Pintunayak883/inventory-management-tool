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

interface Item {
  id: string;
  name: string;
}

interface Warehouse {
  id: string;
  name: string;
}

interface NewAddAdjustmentsProps {
  initialData?: {
    referenceNumber?: string;
    addStockQty?: string | number;
    notes?: string;
    receivingWarehouseId?: string;
    itemId?: string;
    id?: string;
  };
  isUpdate?: boolean;
}

const NewAddAdjustments: React.FC<NewAddAdjustmentsProps> = ({
  initialData = {},
  isUpdate = false,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [formData, setFormData] = useState({
    referenceNumber: initialData.referenceNumber || "",
    addStockQty: initialData.addStockQty || "",
    notes: initialData.notes || "",
    receivingWarehouseId: initialData.receivingWarehouseId || "",
    selectitem: initialData.itemId || "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedItems: Item[] = await GetData("items");
        const fetchedWarehouses: Warehouse[] = await GetData("warehouse");

        setItems(fetchedItems);
        setWarehouses(fetchedWarehouses);

        setFormData((prevData) => ({
          ...prevData,
          selectitem: initialData.itemId || fetchedItems[0]?.id || "",
          receivingWarehouseId:
            initialData.receivingWarehouseId || fetchedWarehouses[0]?.id || "",
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading data for form.");
      }
    };

    fetchData();
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "addStockQty" ? parseInt(value, 10) || "" : value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        addStockQty: parseInt(formData.addStockQty as string, 10),
        itemId: formData.selectitem,
      };
      if (isUpdate) {
        await axios.put(
          `http://localhost:3000/api/adjustments/add/${initialData.id}`,
          dataToSend
        );
        toast.success("Stock updated successfully.");
      } else {
        await axios.post(
          `http://localhost:3000/api/adjustments/add`,
          dataToSend
        );
        toast.success("New stock added successfully.");
      }
      router.push("/dashboard/Inventory/adjustments");
      router.refresh();
      handleReset();
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      referenceNumber: initialData.referenceNumber || "",
      addStockQty: "",
      notes: "",
      receivingWarehouseId: "",
      selectitem: "",
    });
    setFormErrors({});
  };

  return (
    <>
      <FormHeader
        title={isUpdate ? "Update Add Stock" : "New Add Stock"}
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
            title={isUpdate ? "Update Add Stock" : "New Add Stock"}
          />
        </form>
      </div>
    </>
  );
};

export default NewAddAdjustments;
