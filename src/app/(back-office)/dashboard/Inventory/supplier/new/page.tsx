"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import FormHeader from "@/components/dashboard/FormHeader";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInputs from "@/components/FormInputs/TextareaInputs";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define interfaces for Supplier data
interface SupplierData {
  name: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  address: string;
  contactPerson: string;
  supplierCode: string;
  paymentTerms: string;
  taxID: string;
  notes: string;
  id?: string; // Only required for update
}

interface NewSupplierProps {
  initialData?: SupplierData;
  isUpdate?: boolean;
}

const NewSupplier: React.FC<NewSupplierProps> = ({
  initialData = {},
  isUpdate = false,
}) => {
  const baseUrl = "http://localhost:3000";
  const router = useRouter();

  // State to store form input values
  const [formData, setFormData] = useState<SupplierData>({
    name: initialData.name || "",
    description: initialData.description || "",
    location: initialData.location || "",
    phone: initialData.phone || "",
    email: initialData.email || "",
    address: initialData.address || "",
    contactPerson: initialData.contactPerson || "",
    supplierCode: initialData.supplierCode || "",
    paymentTerms: initialData.paymentTerms || "",
    taxID: initialData.taxID || "",
    notes: initialData.notes || "",
  });

  // State to store form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    name: "",
    description: "",
    location: "",
    phone: "",
    email: "",
    address: "",
    contactPerson: "",
    supplierCode: "",
    paymentTerms: "",
    taxID: "",
    notes: "",
  });

  // State to track loading status
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form input changes dynamically
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!formData.name) {
      errors.name = "Name is required.";
    }
    if (!formData.description) {
      errors.description = "Description is required.";
    }
    if (!formData.location) {
      errors.location = "Location is required.";
    }
    if (!formData.supplierCode) {
      errors.supplierCode = "Supplier code is required.";
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
    } else {
      setLoading(true); // Set loading state to true

      try {
        let res;
        if (isUpdate) {
          // API call for updating supplier
          res = await axios.put(
            `${baseUrl}/api/supplier/${initialData.id}`,
            formData
          );
          toast.success("Supplier Updated Successfully.");
        } else {
          // API call for creating new supplier
          res = await axios.post(`${baseUrl}/api/supplier`, formData);
          toast.success("New Supplier Created Successfully.");
        }

        // Redirect to the supplier list page after success
        router.push("/dashboard/Inventory/supplier");
        router.refresh(); // Refresh the page if necessary

        handleReset(); // Reset the form after submission
      } catch (error) {
        console.error("Error in form submission:", error);
        toast.error("Something went wrong!"); // Show error toast
      } finally {
        setLoading(false); // Reset loading state after submission
      }
    }
  };

  // Handle reset action
  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      location: "",
      phone: "",
      email: "",
      address: "",
      contactPerson: "",
      supplierCode: "",
      paymentTerms: "",
      taxID: "",
      notes: "",
    });
    setFormErrors({});
  };

  return (
    <>
      <div className="">
        <FormHeader
          title={isUpdate ? "Update Supplier" : "New Supplier"}
          href={"/dashboard/Inventory/supplier"}
        />
        <div className="w-full max-w-4xl mx-auto my-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <TextInput
                  label="Supplier name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Supplier name"
                  error={formErrors.name}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  label="Supplier Code"
                  name="supplierCode"
                  value={formData.supplierCode}
                  onChange={handleInputChange}
                  placeholder="Enter Supplier Code"
                  error={formErrors.supplierCode}
                />
              </div>
            </div>

            <div className="mt-4">
              <TextInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                error={formErrors.location}
              />
            </div>

            <div className="flex space-x-4 mt-4">
              <div className="w-1/2">
                <TextInput
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone"
                  error={formErrors.phone}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  error={formErrors.email}
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <div className="w-1/2">
                <TextInput
                  label="Contact Person"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Enter contact person"
                  error={formErrors.contactPerson}
                />
              </div>

              <div className="w-1/2">
                <TextInput
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  error={formErrors.address}
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <div className="w-1/2">
                <TextInput
                  label="Payment Terms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                  placeholder="Enter payment terms"
                  error={formErrors.paymentTerms}
                />
              </div>
              <div className="w-1/2">
                <TextInput
                  label="Tax ID"
                  name="taxID"
                  value={formData.taxID}
                  onChange={handleInputChange}
                  placeholder="Enter tax ID"
                  error={formErrors.taxID}
                />
              </div>
            </div>

            <div className="mt-4">
              <TextareaInputs
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                error={formErrors.description}
              />
            </div>

            <div className="mt-4">
              <TextareaInputs
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes"
                error={formErrors.notes}
              />
            </div>

            <div className="flex mt-6">
              <SubmitButton
                loading={loading}
                title={isUpdate ? "Update Supplier" : "New Supplier"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSupplier;
