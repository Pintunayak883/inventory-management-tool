import HomeNavbar from "@/components/dashboard/HomeNavbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="">
        <HomeNavbar />
        {children}
      </div>
    </>
  );
};

export default layout;
