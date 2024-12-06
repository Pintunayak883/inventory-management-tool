import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import Deletebtn from "./Deletebtn";

type DataTableProps<T> = {
  data: T[]; // Generic type for flexibility
  headings: { key: keyof T; label: string }[]; // Object with key and label for headings
  resourceTitle: string;
};

const DataTable = <T extends Record<string, any>>({
  data,
  headings,
  resourceTitle,
}: DataTableProps<T>) => {
  console.log(data);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-8 bg-white border border-gray-200">
      {data?.length === 0 ? (
        <div className="flex items-center justify-center font-bold h-20 text-xl text-gray-500 bg-white border border-dashed border-gray-300 rounded-lg">
          There is No Data to Display
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {headings.map((heading) => (
                <th
                  key={heading.label}
                  scope="col"
                  className="px-6 py-3 text-gray-700"
                >
                  {heading.label}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i} className="bg-white border-b">
                {headings.map((heading) => (
                  <td key={heading.label} className="px-6 py-4">
                    {/* Conditional rendering for image */}
                    {heading.key === "imageUrl" ? (
                      <img
                        src={item[heading.key]}
                        alt={item.title || "Item Image"}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      item[heading.key]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right flex space-x-4 items-center">
                  <Link
                    href={`/dashboard/Inventory/${
                      resourceTitle === "add" || resourceTitle === "transfer"
                        ? `adjustments/${resourceTitle}`
                        : resourceTitle
                    }/update/${item.id}`}
                    className="flex items-center space-x-1 font-medium text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <Deletebtn
                    id={item.id}
                    endpoint={
                      resourceTitle === "add" || resourceTitle === "transfer"
                        ? `adjustments/${resourceTitle}`
                        : resourceTitle
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
