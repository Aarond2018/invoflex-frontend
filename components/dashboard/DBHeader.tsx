"use client";

import React from "react";
import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../../public/logo/logo.png";
import Image from "next/image";
import SidebarLinks, { links } from "./SidebarLinks";
import Link from "next/link";
import { deleteAuthCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
};

export default function DBHeader({ title }: Props) {
  const router = useRouter()

  const handleLogout = () => {
    deleteAuthCookie()
    router.replace("/auth/login")
  }

  return (
    <header className="flex justify-between items-center border-b pb-4">
      <h1 className="text-2xl hidden sm:flex font-semibold">{title}</h1>
      <Link href="/dashboard"><Image src={logo} alt="invoflex-logo" className="flex w-20 sm:hidden" /></Link>
      <div className="flex items-center">
        <button onClick={handleLogout} className="hidden sm:flex gap-1 text-red cursor-pointer">
          <LogOut className="w-6 h-6 font-semibold" />
          <span>Log out</span>
        </button>
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 sm:hidden" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
            <SheetTitle> </SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-8">
                  <Link href="/"><Image src={logo} alt="invoflex-logo" className="w-24" /></Link>
                  <ul className="w-full flex flex-col gap-4">
                  {links.map((linkObj, index) => (
                    <li key={index} className="bg-[#f9fafb] rounded-md">
                      <Link
                        href={linkObj.link}
                        className="flex gap-2 p-3 rounded-md transition-all hover:font-semibold"
                      >
                        <span>{linkObj.icon}</span>
                        <span className="transition-all">
                          {linkObj.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                  </ul>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
