"use client";

import React from "react";
import { LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "../../public/logo/logo.png";
import Image from "next/image";
import SidebarLinks, { links } from "./SidebarLinks";
import Link from "next/link";

type Props = {
  title: string;
};

export default function DBHeader({ title }: Props) {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="flex items-center">
        <div className="hidden sm:flex gap-1 text-red cursor-pointer">
          <LogOut className="w-6 h-6 font-semibold" />
          <span>Log out</span>
        </div>
        <Sheet>
          <SheetTrigger>
            <Menu className="w-6 h-6 sm:hidden" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col gap-8">
                  <Image src={logo} alt="invoflex-logo" className="w-24" />
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
