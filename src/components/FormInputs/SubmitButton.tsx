import { Plus } from "lucide-react";
import React from "react";

const SubmitButton = ({ loading, title }) => {
  return (
    <>
      <div className="mt-6 sm:col-span-1">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? (
            <span>Please wait, saving {title}...</span>
          ) : (
            <>
              <Plus className="w-5 h-5 mr-2" />
              <span className="">Save {title}</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default SubmitButton;
