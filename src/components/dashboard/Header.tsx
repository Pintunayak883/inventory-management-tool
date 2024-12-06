"use client";
import React from "react";
import {
  AlignJustify,
  BellIcon,
  ChevronDownSquare,
  HistoryIcon,
  LayoutGridIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { generateInitials } from "@/lib/generateinitials";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingUser from "../LoadingUser";

const Header = ({ setShowSidebar }: { setShowSidebar: boolean }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <LoadingUser />;
  }
  if (status === "unauthenticated") {
    return router.push("/login");
  }
  const username = session?.user?.name?.split(" ")[0];
  const initails = generateInitials(session?.user?.name);
  const handleClick = () => {
    setShowSidebar(true);
  };
  return (
    <>
      <div className="bg-gray-100">
        <div className="flex items-center justify-between px-8 h-12 border-b border-slate-200">
          <button className="lg:hidden" onClick={handleClick}>
            <AlignJustify className="h-6 w-6" />
          </button>
          {/* Recent Activities */}
          <div className="flex gap-3">
            <button className="hidden lg:block">
              <HistoryIcon className="h-6 w-6" />
            </button>
            <SearchInput />
          </div>
          <div className=" items-center gap-3 hidden lg:flex">
            <div className="pr-2 border-r border-gray-300">
              <button className="p-1 rounded-lg bg-blue-600">
                <PlusIcon className="text-slate-50 w-4 h-4" />
              </button>
            </div>
            <div className="flex">
              <button className="p-1 rounded-lg hover:bg-slate-200">
                <UserIcon className=" text-slate-900 w-4 h-4" />
              </button>
              <button className="p-1 rounded-lg hover:bg-slate-200">
                <BellIcon className=" text-slate-900 w-4 h-4" />
              </button>
              <button className="p-1 rounded-lg hover:bg-slate-200">
                <SettingsIcon className=" text-slate-900 w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-3 ">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <button className="flex items-center">
                    <span className="">{username}</span>
                    <ChevronDownSquare className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className=""
                    >
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button>
                <LayoutGridIcon className="h-6 w-6 text-slate-900" />
              </button>
            </div>
            <button>
              {session?.user?.image ? (
                <Image
                  alt="User_img"
                  width={96}
                  height={96}
                  src={session?.user?.image}
                  className="rounded-full w-8 h-8 border border-slate-900"
                />
              ) : (
                <div className="rounded-full w-8 h-8  flex items-center justify-center text-white bg-blue-600">
                  {initails}
                </div>
              )}
            </button>
          </div>
          <button className="lg:hidden block">
            {session?.user?.image ? (
              <Image
                alt="User_img"
                width={96}
                height={96}
                src={session?.user?.image}
                className="rounded-full w-8 h-8 border border-slate-900"
              />
            ) : (
              <div className="rounded-full w-8 h-8  flex items-center justify-center text-white bg-blue-600">
                {initails}
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
