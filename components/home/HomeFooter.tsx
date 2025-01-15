import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { getCurrentYear } from "@/lib/utils";

export default function HomeFooter() {
  return (
    <footer className="bg-[#101727] py-8 w-full text-white">
      <MaxWidthWrapper>
        <Image
          src="/logo/full-logo-white.svg"
          width={84}
          height={48}
          alt="invoflex-logo"
          className="w-[5.25rem] h-auto"
        />
        <hr className="border-slate-500 my-2" />
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-2  text-sm">
          <p>@InvoFlex{getCurrentYear()}</p>
          <div className="flex gap-2">
            <p className="cursor-pointer hover:underline">Privacy policy</p>
            <p className="cursor-pointer hover:underline">
              Terms and conditions
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
