"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CollapsibleLink from "./CollapsibleLink";
import { ChevronRight } from "lucide-react"; // Import icon here directly

const SidebarDropdownLink = ({
  title,
  items,
  icon: Icon,
  setShowSidebar,
}: {
  title: string;
  items: { label: string; href: string; setShowSidebar: boolean }[];
}) => {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2 p-2">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <ChevronRight className="w-4 h-4" />
      </CollapsibleTrigger>

      <CollapsibleContent>
        {items.map((item, index) => (
          <CollapsibleLink
            setShowSidebar={setShowSidebar}
            key={index}
            item={item}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarDropdownLink;
