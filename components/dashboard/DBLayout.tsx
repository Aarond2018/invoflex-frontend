"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import logo from "../../public/logo/logo.png";
import logoIcon from "../../public/logo/logo-icon-black.svg"
import Link from "next/link";
import SidebarLinks from "./SidebarLinks";

type Props = {
  children: ReactNode;
};

export default function DBLayout({ children }: Props) {
  return (
    <main className="w-full relative dbBg">
      <nav className="hidden sm:flex flex-col gap-12 items-center w-[5rem] md_lg:w-[18rem] px-4 py-6 md_lg:px-6 bg-white fixed h-[100vh] overflow-y-scroll no-scrollbar top-0 left-0 transition-all">
        <div className="hidden md_lg:block w-28">
          <Link href="/">
            <Image src={logo} alt="invoflex-logo" className="w-full" />
          </Link>
        </div>
        <div className="flex md_lg:hidden w-12">
          <Link href="/">
            <Image src={logoIcon} alt="invoflex-logo" className="w-full" />
          </Link>
        </div>
        <SidebarLinks />
      </nav>
      <section className="w-full min-h-[100vh] pl-0 sm:pl-[5rem] md_lg:pl-[18rem] transition-all">
        {children}
      </section>
    </main>
  );
}
