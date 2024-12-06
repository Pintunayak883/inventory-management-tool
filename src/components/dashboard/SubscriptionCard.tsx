import Link from "next/link";
import React from "react";

const SubscriptionCard = () => {
  return (
    <>
      <div className="py-3 px-1">
        <div className="mt-3 p-3 bg-slate-950 rounded-lg">
          <div className="border-b border-slate-600 pb-3">
            <p className="text-sm border-l border-orange-400 pl-2">
              Your Premium plan&apos;s trial expires in{" "}
              <span className="text-orange-400">13 days</span>.
            </p>
          </div>
          <div className="flex space-x-3 text-sm">
            <button className="border-r border-slate-600 p-1">
              Change Plan
            </button>
            <Link href="#" className="p-1">
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCard;
