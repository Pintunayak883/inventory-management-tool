import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingUser = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <ClipLoader color="#4F46E5" size={50} />
        <p className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-100">
          Loading, please wait...
        </p>
      </div>
    </section>
  );
};

export default LoadingUser;
