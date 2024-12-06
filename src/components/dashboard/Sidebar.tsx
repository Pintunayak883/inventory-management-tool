"use client";
import {
  BaggageClaim,
  BarChart4,
  ShoppingBasket,
  ShoppingCartIcon,
  HomeIcon,
  Files,
  Cable,
  X, // Add HomeIcon here
} from "lucide-react";
import Link from "next/link";
import React from "react";
import SidebarDropdownLink from "./SidebarDropdownLink";
import SubscriptionCard from "./SubscriptionCard";

const Sidebar = ({
  ShowSidebar,
  setShowSidebar,
}: {
  ShowSidebar: boolean;
  setShowSidebar: boolean;
}) => {
  const inventoryItems = [
    { label: "All", href: "/dashboard/Inventory" },
    { label: "Items", href: "/dashboard/Inventory/items" },
    { label: "Categories", href: "/dashboard/Inventory/categories" },
    { label: "Brands", href: "/dashboard/Inventory/brands" },
    { label: "Units", href: "/dashboard/Inventory/units" },
    { label: "Warehouse", href: "/dashboard/Inventory/warehouse" },
    {
      label: "Adjustments",
      href: "/dashboard/Inventory/adjustments",
    },
    {
      label: "Supplier",
      href: "/dashboard/Inventory/supplier",
    },
  ];

  const SalesLinks = [
    { label: "Customers", href: "#" },
    { label: "Sales Orders", href: "#" },
    { label: "Packages", href: "#" },
    { label: "Shipments", href: "#" },
    { label: "Invoices", href: "#" },
    { label: "Sales Receipts", href: "#" },
    { label: "Payment Received", href: "#" },
    { label: "Sales returns", href: "#" },
    { label: "Credit Notes", href: "#" },
  ];

  return (
    <div
      className={`${
        ShowSidebar
          ? "w-60 min-h-screen bg-slate-900 text-slate-50 p-3  fixed  lg:block z-50"
          : "w-60 min-h-screen bg-slate-900 text-slate-50 p-3  fixed hidden lg:block z-50"
      }`}
    >
      {/* Top Part */}
      <div className="flex flex-col ">
        {/* Logo */}
        <div className="flex justify-between">
          <Link
            href={"#"}
            className="flex space-x-2 py-3 px-2 items-center bg-slate-950 w-full"
          >
            <ShoppingCartIcon />
            <span className="text-2xl font-semibold">Inventory</span>
          </Link>
          <button
            className="px-4 py-3 lg:hidden bg-slate-950"
            onClick={() => setShowSidebar(false)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-3 px-3 py-6">
          {/* Home Link */}
          <Link
            href={"#"}
            className="flex items-center space-x-2 bg-blue-600 text-slate-50 p-2 rounded-md"
          >
            <HomeIcon className="w-4 h-4" /> {/* HomeIcon */}
            <span>Home</span>
          </Link>

          {/* SidebarDropdownLink now handles rendering the icon itself */}
          <SidebarDropdownLink
            title="Inventory"
            items={inventoryItems}
            icon={BaggageClaim}
            setShowSidebar={setShowSidebar}
          />

          <SidebarDropdownLink
            title="Sales"
            items={SalesLinks}
            icon={ShoppingBasket}
            setShowSidebar={setShowSidebar}
          />
          <button className="flex items-center space-x-2 p-2">
            <ShoppingCartIcon className="w-4 h-4" />
            <span>Purchases</span>
          </button>
          <Link href={"#"} className="flex items-center space-x-2 p-2">
            <Cable className="w-4 h-4" />
            <span> Integrations</span>
          </Link>
          <Link href={"#"} className="flex items-center space-x-2 p-2">
            <BarChart4 className="w-4 h-4" />
            <span> Reports</span>
          </Link>
          <Link href={"#"} className="flex items-center space-x-2 p-2">
            <Files className="w-4 h-4" />
            <span> Documents</span>
          </Link>
        </nav>

        <SubscriptionCard />
      </div>

      {/* Bottom */}
      <div className="flex flex-col ">
        <div className="bg-slate-950 flex space-x-2 items-center justify-center py-3 px-2">
          {/* Footer or collapse button */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
