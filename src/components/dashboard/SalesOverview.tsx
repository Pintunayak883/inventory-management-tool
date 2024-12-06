import { CheckCircle2 } from "lucide-react";
import React from "react";
import SalesActivityCard from "./SalesActivityCard";

const SalesOverview = () => {
  const salesActivity = [
    {
      title: "CATEGORIES",
      number: 10,
      href: "#",
      color: "text-blue-600",
    },
    {
      title: "ITEMS",
      number: 0,
      href: "#",
      color: "text-red-600",
    },
    {
      title: "WAREHOUSE",
      number: 0,
      href: "#",
      color: "text-green-600",
    },
    {
      title: "SUPPLIERS",
      number: 0,
      href: "#",
      color: "text-orange-600",
    },
  ];

  const InventorySummery = [
    {
      title: "Quantity in Hand",
      number: 10,
    },
    {
      title: "Quantity to be Received",
      number: 0,
    },
  ];

  return (
    <>
      <div className="bg-blue-100 border-b border-slate-300 p-4 flex flex-col gap-6 grid grid-cols-12">
        {/* Sales Activity Section */}
        <div className="col-span-full lg:col-span-8 border-r border-slate-300 p-8">
          <h2 className="mb-6 text-xl font-semibold text-slate-700">
            Sales Activity
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesActivity.map((item, i) => (
              <SalesActivityCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Inventory Summary Section */}
        <div className="col-span-full lg:col-span-4">
          <h2 className="mb-6 text-xl font-semibold text-slate-700">
            Inventory Summary
          </h2>
          <div className="space-y-4">
            {InventorySummery.map((item, i) => (
              <div
                key={i}
                className="shadow rounded-lg bg-white border border-slate-200 hover:border-blue-400 px-4 py-3 cursor-pointer flex justify-between items-center transition-all duration-300"
              >
                <h2 className="uppercase text-slate-500 text-sm">
                  {item.title}
                </h2>
                <h4 className="font-bold text-2xl text-slate-700">
                  {item.number}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesOverview;
