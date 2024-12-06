import { CheckCircle2 } from "lucide-react";
import React from "react";

const SalesActivityCard = ({ item }: { item: string }) => {
  return (
    <>
      {/* Card 1 */}
      <div className="text-center items-center shadow rounded-lg  bg-white border cursor-pointer border-slate-200 hover:border-blue-400 p-6">
        <h4 className={`font-bold text-3xl ${item.color}`}>{item.number}</h4>
        <small className="text-slate-500">{item.unit}</small>
        <div className="flex items-center justify-center   text-slate-500 py-2">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          <span className="uppercase text-xs text-center">{item.title}</span>
        </div>
      </div>
    </>
  );
};

export default SalesActivityCard;
