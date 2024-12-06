"use client";
import {
  HelpCircle,
  LayoutGrid,
  List,
  MoreHorizontal,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // Use usePathname here

const FixedHeader = ({
  newLink,
  title,
}: {
  newLink: string;
  title: string;
}) => {
  const pathname = usePathname(); // Using usePathname to get current path

  // Check if current pathname is 'dashboard/Inventory/adjustments'
  const isAdjustmentsPage = pathname === "/dashboard/Inventory/adjustments";

  return (
    <div className="flex justify-between items-center bg-white py-6 px-4">
      <button className="text-2xl">{title}</button>
      <div className="flex gap-4">
        {/* Show different Plus buttons on adjustments page */}
        {isAdjustmentsPage ? (
          <>
            <Link
              href="/dashboard/Inventory/adjustments/add/new"
              className="p-1 rounded-sm bg-blue-600 flex items-center space-x-2 px-4 text-white"
            >
              <PlusIcon className="text-slate-50 w-4 h-4" />
              <span>Add</span>
            </Link>
            <Link
              href="/dashboard/Inventory/adjustments/transfer/new"
              className="p-1 rounded-sm bg-blue-600 flex items-center space-x-2 px-4 text-white"
            >
              <PlusIcon className="text-slate-50 w-4 h-4" />
              <span>Transfer</span>
            </Link>
          </>
        ) : (
          <Link
            href={newLink}
            className="p-1 rounded-sm bg-blue-600 flex items-center space-x-2 px-4 text-white"
          >
            <PlusIcon className="text-slate-50 w-4 h-4" />
            <span>New</span>
          </Link>
        )}

        {/* Layout */}
        <div className="flex rounded-md overflow-hidden">
          <button className="bg-gray-300 p-2 border-r border-gray-400">
            <List className="w-4 h-4 " />
          </button>
          <button className="bg-gray-100 p-2">
            <LayoutGrid className="w-4 h-4 " />
          </button>
        </div>

        {/* More */}
        <button className="bg-gray-100 p-2">
          <MoreHorizontal className="w-4 h-4 " />
        </button>

        {/* Help */}
        <button className="bg-orange-600 p-2 text-white rounded-md">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FixedHeader;
