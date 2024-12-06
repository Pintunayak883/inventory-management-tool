"use client";
import React, { useState } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextareaInputs";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Plus, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NewCategory = ({ initialData = {}, isUpdate = false }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Use env variable for base URL
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) {
      errors.title = "Title is required.";
    }
    if (!formData.description) {
      errors.description = "Description is required.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      let res;
      const categoryData = {
        title: formData.title,
        description: formData.description,
      };

      if (isUpdate) {
        res = await axios.put(
          `${baseUrl}/api/categories/${initialData.id}`,
          categoryData
        );
        toast.success("Category Updated Successfully.");
      } else {
        res = await axios.post(`${baseUrl}/api/categories`, categoryData);
        toast.success("New Category Created Successfully.");
      }

      router.push("/dashboard/Inventory/categories");
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
      title: "",
      description: "",
    });
    setFormErrors({
      title: "",
      description: "",
    });
  };

  return (
    <>
      <div>
        <FormHeader
          title={isUpdate ? "Update Category" : "New Category"}
          href="/dashboard/Inventory/categories"
        />
        <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div>
              <TextInput
                label="Category Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter category title"
                error={formErrors.title}
              />
              <TextareaInput
                label="Category Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter category description"
                error={formErrors.description}
              />
            </div>
            <div className="flex mt-6 sm:col-span-1">
              <SubmitButton
                loading={loading}
                title={isUpdate ? "Update Category" : "New Category"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewCategory;
