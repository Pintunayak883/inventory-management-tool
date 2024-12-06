"use client";
import React, { useState } from "react";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInputs from "@/components/FormInputs/TextareaInputs";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import SelectInput from "@/components/FormInputs/SelectInput";
import axios from "axios";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreatedItemForm = ({
  categories,
  units,
  brands,
  warehouses,
  suppliers,
  initialData = {},
  isUpdate,
}) => {
  const baseUrl = "http://localhost:3000";
  const [ImageUrl, setImageUrl] = useState(initialData.imageUrl || "");
  const router = useRouter();
  // State to store form input values
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    categoryId: initialData.categoryId || "",
    sku: initialData.sku || "",
    barcode: initialData.barcode || "",
    qty: initialData.quantity || "",
    unitId: initialData.unitId || "",
    brandId: initialData.brandId || "",
    description: initialData.description || "",
    supplierId: initialData.supplierId || "",
    reOrderPoint: initialData.reOrderPoint || "",
    warehouseId: initialData.warehouseId || "",
    weight: initialData.weight || "",
    dimensions: initialData.dimensions || "",
    taxRate: initialData.taxRate || "",
    nots: initialData.notes || "",
    buyingPrice: initialData.buyingPrice || "",
    sellingPrice: initialData.sellingPrice || "",
  });

  // State to store form errors
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form input changes dynamically
  const handleInputChange = (e) => {
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
  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required.";
    if (!formData.categoryId) errors.categoryId = "Category is required.";
    if (!formData.sku) errors.sku = "SKU is required.";
    if (!formData.barcode) errors.barcode = "Barcode is required.";
    if (!formData.qty) errors.qty = "Quantity is required.";
    if (!formData.unitId) errors.unitId = "Unit is required.";
    if (!formData.brandId) errors.brandId = "Brand is required.";
    if (!formData.description) errors.description = "Description is required.";
    if (!formData.supplierId) errors.supplierId = "Supplier is required.";
    if (!formData.reOrderPoint)
      errors.reOrderPoint = "Re-Order Point is required.";
    if (!formData.warehouseId) errors.warehouseId = "Warehouse is required.";
    if (!formData.weight) errors.weight = "Weight is required.";
    if (!formData.dimensions) errors.dimensions = "Dimensions are required.";
    if (!formData.taxRate) errors.taxRate = "Tax rate is required.";
    if (!formData.nots) errors.nots = "Notes is required.";
    if (!formData.buyingPrice) errors.buyingPrice = "Buying price is required.";
    if (!formData.sellingPrice)
      errors.sellingPrice = "Selling price is required.";

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
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
        // API call for updating item
        res = await axios.put(`${baseUrl}/api/items/${initialData.id}`, {
          title: formData.title,
          categoryId: formData.categoryId,
          sku: formData.sku,
          barcode: formData.barcode,
          quantity: formData.qty,
          unitId: formData.unitId,
          brandId: formData.brandId,
          description: formData.description,
          supplierId: formData.supplierId,
          reOrderPoint: formData.reOrderPoint,
          warehouseId: formData.warehouseId,
          weight: formData.weight,
          dimensions: formData.dimensions,
          taxRate: formData.taxRate,
          notes: formData.nots,
          buyingPrice: formData.buyingPrice,
          sellingPrice: formData.sellingPrice,
          imageUrl: ImageUrl, // imageUrl ko pass karte waqt use karo
        });
        router.push("/dashboard/Inventory/items");
        toast.success("Item Updated Successfully.");
      } else {
        // API call for creating new item
        res = await axios.post(`${baseUrl}/api/items`, {
          title: formData.title,
          categoryId: formData.categoryId,
          sku: formData.sku,
          barcode: formData.barcode,
          quantity: formData.qty,
          unitId: formData.unitId,
          brandId: formData.brandId,
          description: formData.description,
          supplierId: formData.supplierId,
          reOrderPoint: formData.reOrderPoint,
          warehouseId: formData.warehouseId,
          weight: formData.weight,
          dimensions: formData.dimensions,
          taxRate: formData.taxRate,
          notes: formData.nots,
          buyingPrice: formData.buyingPrice,
          sellingPrice: formData.sellingPrice,
          imageUrl: ImageUrl, // imageUrl ko pass karte waqt use karo
        });
        router.push("/dashboard/Inventory/items");
        router.refresh();
        toast.success("New Item Created Successfully.");
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
      categoryId: "",
      sku: "",
      barcode: "",
      qty: "",
      unitId: "",
      brandId: "",
      description: "",
      supplierId: "",
      reOrderPoint: "",
      warehouseId: "",
      imageUrl: "",
      weight: "",
      dimensions: "",
      taxRate: "",
      nots: "",
      buyingPrice: "",
      sellingPrice: "",
    });
    setImageUrl("");
    setFormErrors({});
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Two fields in a row */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <TextInput
              label="Item Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter item title"
              error={formErrors.title}
            />
          </div>
          <div className="w-1/2">
            <SelectInput
              name="categoryId"
              label="Select Item Category"
              className="w-full"
              options={categories}
              error={formErrors.categoryId}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <TextInput
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              placeholder="Enter SKU"
              error={formErrors.sku}
            />
          </div>
          <div className="w-1/2">
            <TextInput
              label="Barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
              placeholder="Enter barcode"
              error={formErrors.barcode}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <TextInput
              label="Quantity"
              name="qty"
              value={formData.qty}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              error={formErrors.qty}
              type="number"
            />
          </div>
          <div className="w-1/2">
            <SelectInput
              name="unitId"
              label="Select Unit"
              className="w-full"
              options={units}
              error={formErrors.unitId}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <SelectInput
              name="brandId"
              label="Select Brand"
              className="w-full"
              options={brands}
              error={formErrors.brandId}
              onChange={handleInputChange}
              isUpdate={true}
              initialData={initialData.brand?.title}
            />
          </div>
          <div className="w-1/2">
            <SelectInput
              name="supplierId"
              label="Select Supplier"
              className="w-full"
              options={suppliers}
              error={formErrors.supplierId}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <TextInput
              label="Re-order Point"
              name="reOrderPoint"
              value={formData.reOrderPoint}
              onChange={handleInputChange}
              placeholder="Enter re-order point"
              error={formErrors.reOrderPoint}
            />
          </div>
          <div className="w-1/2">
            <SelectInput
              name="warehouseId"
              label="Select Warehouse"
              className="w-full"
              options={warehouses}
              error={formErrors.warehouseId}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <TextInput
              label="Buying Price"
              name="buyingPrice"
              value={formData.buyingPrice}
              onChange={handleInputChange}
              placeholder="Enter buying price"
              error={formErrors.buyingPrice}
              type="number"
            />
          </div>
          <div className="w-1/2">
            <TextInput
              label="Selling Price"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              placeholder="Enter selling price"
              error={formErrors.sellingPrice}
              type="number"
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="w-1/2">
            <TextInput
              label="Weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight"
              error={formErrors.weight}
              type="number"
            />
          </div>
          <div className="w-1/2">
            <TextInput
              label="Dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              placeholder="Enter dimensions"
              error={formErrors.dimensions}
            />
          </div>
        </div>

        <div className="mt-4">
          <TextInput
            label="Tax Rate (%)"
            name="taxRate"
            value={formData.taxRate}
            onChange={handleInputChange}
            placeholder="Enter tax rate"
            error={formErrors.taxRate}
            type="number"
          />
        </div>

        <div className="mt-4">
          <TextareaInputs
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter item description"
            error={formErrors.description}
          />
        </div>

        <div className="mt-4">
          <TextareaInputs
            label="Nots"
            name="nots"
            value={formData.nots}
            onChange={handleInputChange}
            placeholder="Enter item nots"
            error={formErrors.nots}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label
              htmlFor="course-image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Item Image
            </label>
            {ImageUrl && (
              <button
                onClick={() => setImageUrl("")}
                type="button"
                className="flex space-x-2 my-4 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
              >
                <Pencil className="w-5 h-5" />
                <span>Change Image</span>
              </button>
            )}
          </div>
          {ImageUrl ? (
            <Image
              src={ImageUrl}
              alt="Item image"
              width={1000}
              height={667}
              className="w-full h-64 object-cover"
            />
          ) : (
            <UploadDropzone
              endpoint={"imageUploader"}
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
              }}
              onUploadError={(error) => {
                // Do something with the error.
                console.log(`ERROR! ${error.message}`);
              }}
            />
          )}
        </div>

        <div className="flex mt-6 sm:col-span-1">
          <SubmitButton
            type="submit"
            loading={loading}
            title={isUpdate ? "Update Item" : "New Item"}
          />
        </div>
      </form>
    </>
  );
};

export default CreatedItemForm;
