import React from "react";
import { GetData } from "@/lib/getData";
import NewCategory from "../../new/page";

// Define the type for the category data
interface Category {
  title: string;
  description?: string; // Optional, in case description is missing
}

interface UpdateCategoryProps {
  params: {
    id: string; // Assuming the id is a string
  };
}

const UpdateCategory: React.FC<UpdateCategoryProps> = async ({
  params: { id },
}) => {
  try {
    // Fetch category data using the provided id
    const data: Category = await GetData(`categories/${id}`);
    console.log(data); // Log the fetched data for debugging

    return (
      <>
        {/* Pass the data to the NewCategory component */}
        <NewCategory initialData={data} isUpdate={true} />
      </>
    );
  } catch (error) {
    console.error("Error fetching category data:", error);
    return <div>Error loading category data</div>; // Handle errors gracefully
  }
};

export default UpdateCategory;
