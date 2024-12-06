"use client";
import { CreditCard, X } from "lucide-react";
import React, { useState } from "react";

const DashboardBanner = () => {
  const [Hidden, setHidden] = useState(false);
  return (
    <>
      <div
        className={`${
          Hidden
            ? "hidden"
            : "grid grid-cols-1 md:grid-cols-12 items-center py-6 px-6 md:px-16 bg-white gap-4 relative"
        }`}
      >
        {/* Icon */}
        <div className="md:col-span-3 flex justify-center md:justify-start">
          <CreditCard className="w-12 h-12 md:w-16 md:h-16 text-slate-500" />
        </div>

        {/* Text */}
        <div className="md:col-span-6 text-center md:text-left">
          <div className="w-full md:w-1/2 mx-auto md:mx-0">
            <h2 className="font-bold text-xl md:text-2xl">
              Start accepting online payments
            </h2>
            <p className="text-sm md:text-base">
              Businesses are moving towards online payments as they&apos;re
              easy, secure, and fast. Try them for your business today.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="md:col-span-3 flex justify-center md:justify-end">
          <button className="py-2 bg-blue-700 text-white px-6 md:px-8 uppercase rounded-2xl">
            Enable
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setHidden(true)}
          className="absolute top-4 right-4 md:top-4 md:right-16"
        >
          <X className="text-slate-500" />
        </button>
      </div>
    </>
  );
};

export default DashboardBanner;
