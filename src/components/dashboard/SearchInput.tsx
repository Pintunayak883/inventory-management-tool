import { SearchIcon } from "lucide-react";
import React from "react";

const SearchInput = () => {
  return (
    <>
      <div className="hidden lg:block">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 px-2.5 py-1.5"
            placeholder="Search branch Customers"
            required
          />
        </div>
      </div>
    </>
  );
};

export default SearchInput;
