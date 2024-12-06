"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface NewBrandsProps {
  initialData?: {
    id?: string;
    title?: string;
  };
  isUpdate?: boolean;
}

const NewBrands: React.FC<NewBrandsProps> = ({
  initialData = {},
  isUpdate = false,
}) => {
  const baseUrl = "http://localhost:3000";
  const router = useRouter();

  // State to store form input values
  const [formData, setFormData] = useState({
    title: initialData.title || "",
  });

  // State to store form errors
  const [formErrors, setFormErrors] = useState<{ title: string }>({
    title: "",
  });

  // State to track loading status
  const [loading, setLoading] = useState(false);

  // Handle form input changes dynamically
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error for the current field
  };

  // Validate the form fields
  const validateForm = (): { title?: string } => {
    const errors: { title?: string } = {};
    if (!formData.title) {
      errors.title = "Title is required.";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form before submitting
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Set validation errors in state
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      if (isUpdate) {
        // API call for updating brand
        await axios.put(`${baseUrl}/api/brands/${initialData.id}`, {
          title: formData.title,
        });
        toast.success("Brand Updated Successfully.");
      } else {
        // API call for creating new brand
        await axios.post(`${baseUrl}/api/brands`, {
          title: formData.title,
        });
        toast.success("New Brand Created Successfully.");
      }
      router.push("/dashboard/Inventory/brands"); // Redirect after success
      handleReset(); // Reset form
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Something went wrong!"); // Show error toast
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle reset action
  const handleReset = () => {
    setFormData({ title: "" });
    setFormErrors({ title: "" });
  };

  return (
    <>
      <div>
        <FormHeader
          title={isUpdate ? "Update Brand" : "New Brand"}
          href={"/dashboard/Inventory/brands"}
        />
        <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Brand Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Brand Title"
              error={formErrors.title}
            />
            <div className="flex mt-6">
              <SubmitButton
                loading={loading}
                title={isUpdate ? "Update Brand" : "New Brand"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewBrands;
