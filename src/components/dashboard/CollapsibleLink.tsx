import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const CollapsibleLink = ({
  item,
  setShowSidebar,
}: {
  item: string;
  setShowSidebar: boolean;
}) => {
  return (
    <>
      {" "}
      <Link
        className="flex items-center justify-between hover:bg-slate-950 transition-all duration-300 py-2 rounded-md pl-8 pr-4 space-x-3"
        href={item.href}
        onClick={() => setShowSidebar(false)}
      >
        <span className="text-sm">{item.label}</span>
        <PlusCircle className="w-4 h-4" />
      </Link>
    </>
  );
};

export default CollapsibleLink;
