"use client";
//import { Shirt } from "lucide-react";
import Link from "next/link";
import React from "react";

const OptionCard = ({ optionData }: { optionData: any }) => {
  const {
    title,
    description,
    link,
    linktitle,
    enabled,
    icon: Icon,
  } = optionData;
  return (
    <>
      <div className="shadow-md bg-white flex flex-col items-center justify-center gap-4 p-6 rounded">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="">
          <Icon strokeWidth=".5px" className="w-36 h-32" />
        </div>
        <p className="line-clamp-1">{description}</p>

        {enabled ? (
          <Link
            href={link}
            className="inline-flex py-2 rounded-sm bg-blue-600 px-3  items-center space-x-2 text-white"
          >
            {linktitle}
          </Link>
        ) : (
          <button className="py-2 rounded-sm bg-blue-600 px-3 flex items-center space-x-2 text-white">
            Enable
          </button>
        )}
      </div>
    </>
  );
};

export default OptionCard;
