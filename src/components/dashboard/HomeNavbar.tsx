"use client";
import { Building2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import LoadingUser from "../LoadingUser";

const HomeNavbar = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      title: "Dashboard",
      href: "/dashboard/home/overview",
    },
    {
      title: "Getting Started",
      href: "/dashboard/home/getting-started",
    },
    {
      title: "Recent Updates",
      href: "/dashboard/home/updates",
    },
    {
      title: "Announcements",
      href: "/dashboard/home/Announcements",
    },
  ];

  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <LoadingUser />;
  }
  if (status === "unauthenticated") {
    router.push("/login");
  }
  const username = session?.user?.name?.toUpperCase();
  return (
    <>
      <div className="h-32 border-b border-slate-400 p-5">
        <div className="flex space-x-3">
          <div className="flex w-12 h-12 bg-white rounded-lg items-center justify-center">
            <Building2 />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-slate-700">Hello, {username}</p>
            <span className="text-sm">Garat</span>
          </div>
        </div>
        <nav className="sticky mt-6 flex space-x-4 justify-center md:justify-start flex-wrap">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "py-1 border-b-2 border-blue-600 text-blue-600"
                  : "py-1 text-slate-700"
              } text-center md:text-left px-2 md:px-4 transition-all duration-200 ease-in-out`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default HomeNavbar;
