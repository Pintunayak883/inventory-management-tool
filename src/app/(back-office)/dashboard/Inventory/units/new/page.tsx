"use client";
import React, { useState } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define the types for the form data
interface UnitFormData {
  title: string;
  abbreviation: string;
}

// Define the types for the form errors
interface UnitFormErrors {
  title: string;
  abbreviation: string;
}

// Define the props for the NewUnits component
interface NewUnitsProps {
  initialData?: UnitFormData; // Optional initial data for updating
  isUpdate?: boolean; // Flag to check if it's an update or new
}

const NewUnits: React.FC<NewUnitsProps> = ({
  initialData = { title: "", abbreviation: "" },
  isUpdate = false,
}) => {
  const baseUrl = "http://localhost:3000";
  const router = useRouter();

  // State to store form input values
  const [formData, setFormData] = useState<UnitFormData>({
    title: initialData.title,
    abbreviation: initialData.abbreviation,
  });

  // State to store form errors
  const [formErrors, setFormErrors] = useState<UnitFormErrors>({
    title: "",
    abbreviation: "",
  });

  // State to track loading status
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form input changes dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const validateForm = (): UnitFormErrors => {
    const errors: UnitFormErrors = {
      title: "",
      abbreviation: "",
    };
    if (!formData.title) {
      errors.title = "Title is required.";
    }
    if (!formData.abbreviation) {
      errors.abbreviation = "Abbreviation is required.";
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
        // API call for updating unit
        res = await axios.put(`${baseUrl}/api/units/${initialData.id}`, {
          title: formData.title,
          abbreviation: formData.abbreviation,
        });
        router.push("/dashboard/Inventory/units");
        router.refresh();
        toast.success("Unit Updated Successfully.");
      } else {
        // API call for creating new unit
        res = await axios.post(`${baseUrl}/api/units`, {
          title: formData.title,
          abbreviation: formData.abbreviation,
        });
        router.push("/dashboard/Inventory/units"); // Redirect to units list after successful creation
        toast.success("New Unit Created Successfully.");
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
      abbreviation: "",
    });
    setFormErrors({
      title: "",
      abbreviation: "",
    });
  };

  return (
    <>
      <div className="">
        <FormHeader
          title={isUpdate ? "Update Unit" : "New Unit"}
          href={"/dashboard/Inventory/units"}
        />
        <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="">
              <TextInput
                label="Unit Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Unit title"
                error={formErrors.title}
              />
              <TextInput
                label="Unit abbreviation"
                name="abbreviation"
                value={formData.abbreviation}
                onChange={handleInputChange}
                placeholder="Enter Unit abbreviation"
                error={formErrors.abbreviation}
              />
            </div>
            <div className="flex mt-6 sm:col-span-1">
              <SubmitButton
                loading={loading}
                title={isUpdate ? "Update Unit" : "New Unit"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUnits;
