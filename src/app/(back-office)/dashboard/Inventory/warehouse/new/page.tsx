"use client";
import React, { useState } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInputs from "@/components/FormInputs/TextareaInputs";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import SelectInput from "@/components/FormInputs/SelectInput";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define types for the initialData
interface WarehouseData {
  id?: string;
  title: string;
  description: string;
  location: string;
  type: string;
}

// Define types for the form data and form errors
interface FormErrors {
  title: string;
  description: string;
  location: string;
  type: string;
}

// Define the NewWarehouse component props
interface NewWarehouseProps {
  initialData?: WarehouseData;
  isUpdate?: boolean;
}

const NewWarehouse: React.FC<NewWarehouseProps> = ({
  initialData = {},
  isUpdate = false,
}) => {
  const baseUrl = "http://localhost:3000";
  const router = useRouter();

  // State to store form input values
  const [formData, setFormData] = useState<WarehouseData>({
    title: initialData.title,
    description: initialData.description,
    location: initialData.location,
    type: initialData.type,
  });

  // State to store form errors
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: "",
    description: "",
    location: "",
    type: "",
  });

  // State to track loading status
  const [loading, setLoading] = useState(false);

  const selectOptions = [
    {
      title: "Main",
      id: "main",
    },
    {
      title: "Branch",
      id: "branch",
    },
  ];

  // Handle form input changes dynamically
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for the current field
    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  // Validate the form fields
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {
      title: "",
      description: "",
      location: "",
      type: "",
    };

    if (!formData.title) {
      errors.title = "Title is required.";
    }
    if (!formData.description) {
      errors.description = "Description is required.";
    }
    if (!formData.location) {
      errors.location = "Location is required.";
    }
    if (!formData.type) {
      errors.type = "Warehouse type is required.";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submitting
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Set validation errors in state
      return;
    }

    // Set loading state to true
    setLoading(true);
    try {
      let res;
      if (isUpdate) {
        // API call for updating warehouse
        res = await axios.put(`${baseUrl}/api/warehouse/${initialData.id}`, {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          warehouseType: formData.type,
        });
        router.push("/dashboard/Inventory/warehouse");
        router.refresh();
        toast.success("Warehouse Updated Successfully.");
      } else {
        // API call for creating new warehouse
        res = await axios.post(`${baseUrl}/api/warehouse`, {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          warehouseType: formData.type,
        });
        router.push("/dashboard/Inventory/warehouse"); // Redirect to warehouse list after successful creation
        toast.success("New Warehouse Created Successfully.");
      }
      handleReset(); // Reset form after success
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Something went wrong!"); // Show error toast
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  // Handle reset action
  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      type: "",
    });
    setFormErrors({
      title: "",
      description: "",
      location: "",
      type: "",
    });
  };

  return (
    <>
      <div>
        <FormHeader title={"New Warehouse"} href={"/dashboard/Inventory"} />
        <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <SelectInput
                  name={"type"}
                  title={"Select the Warehouse Type"}
                  className="w-full"
                  options={selectOptions}
                  onChange={handleInputChange}
                  value={formData.type || initialData.type}
                />
                {formErrors.type && (
                  <p className="text-red-500">{formErrors.type}</p>
                )}
              </div>
              <div className="w-1/2">
                <TextInput
                  title="Warehouse Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter Warehouse title"
                  error={formErrors.title}
                />
              </div>
            </div>

            <div className="mt-4">
              <TextInput
                title="Warehouse Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter Warehouse location"
                error={formErrors.location}
              />
            </div>

            <div className="mt-4">
              <TextareaInputs
                title="Warehouse Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Warehouse Description"
                error={formErrors.description}
              />
            </div>

            <div className="flex mt-6 sm:col-span-1">
              <SubmitButton loading={loading} title="Warehouse" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewWarehouse;
