"use client";
import React from "react";
import FixedHeader from "@/components/dashboard/FixedHeader";
import {
  Diff,
  Factory,
  LayoutGrid,
  LayoutPanelTopIcon,
  Scale,
  Slack,
  Warehouse,
} from "lucide-react";
import OptionCard from "@/components/dashboard/OptionCard";

// Define the structure for each option card
interface OptionCardData {
  title: string;
  description: string;
  link: string;
  linktitle: string;
  enabled: boolean;
  icon: React.ElementType; // Type for icon components like lucide-react icons
}

const Inventory: React.FC = () => {
  const optionCard: OptionCardData[] = [
    {
      title: "Items",
      description:
        "Create standalone items and services that you buy and sell.",
      link: "/dashboard/Inventory/items/new",
      linktitle: "New Items",
      enabled: true,
      icon: LayoutGrid,
    },
    {
      title: "Categories",
      description: "Bundle different items together and sell them as kits.",
      link: "/dashboard/Inventory/categories/new",
      linktitle: "New Categories",
      enabled: true,
      icon: LayoutPanelTopIcon,
    },
    {
      title: "Brands",
      description:
        "Create standalone items and services that you buy and sell.",
      link: "/dashboard/Inventory/brands/new",
      linktitle: "New Brands",
      enabled: true,
      icon: Slack,
    },
    {
      title: "Warehouse",
      description:
        "Create standalone items and services that you buy and sell.",
      link: "/dashboard/Inventory/warehouse/new",
      linktitle: "New Warehouse",
      enabled: true,
      icon: Warehouse,
    },
    {
      title: "Units",
      description:
        "Create standalone items and services that you buy and sell.",
      link: "/dashboard/Inventory/units/new",
      linktitle: "New Units",
      enabled: true,
      icon: Scale,
    },
    {
      title: "Suppliers",
      description: "Transfer stock from the Main Warehouse.",
      link: "/dashboard/Inventory/supplier/new",
      linktitle: "New Adjustment",
      enabled: true,
      icon: Factory,
    },
    {
      title: "Inventory Adjustments",
      description: "Transfer stock from the Main Warehouse.",
      link: "/dashboard/Inventory/adjustments/new",
      linktitle: "New Adjustment",
      enabled: true,
      icon: Diff,
    },
  ];

  return (
    <>
      <div className="">
        <FixedHeader newLink="/dashboard/Inventory/items/new" />
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 m-4 py-8 px-16 gap-6">
          {optionCard.map((card, i) => (
            <OptionCard key={i} optionData={card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Inventory;
