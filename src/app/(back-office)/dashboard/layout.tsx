"use client";
import Header from "@/components/dashboard/Header";
import "../../../app/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Import Session type
import LoadingUser from "@/components/LoadingUser";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [ShowSidebar, setShowSidebar] = useState<boolean>(false); // Explicitly type ShowSidebar as boolean
  const { data: session, status } = useSession();

  if (status === "loading") return <LoadingUser />;

  return (
    <div className="flex">
      <Sidebar ShowSidebar={ShowSidebar} setShowSidebar={setShowSidebar} />
      <main className="lg:ml-60 ml-0 w-full bg-slate-100 min-h-screen">
        <Header setShowSidebar={setShowSidebar} />
        {children}
      </main>
    </div>
  );
}
