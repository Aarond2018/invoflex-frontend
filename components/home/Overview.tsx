import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Settings } from "lucide-react";

export default function Overview() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#FCFCFD] from-10% to-[#fef9f5] to-90%">
      <MaxWidthWrapper className="max-w-[54rem]">
        <h2 className="text-center text-3xl md_sm:text-4xl md_lg:text-5xl font-light leading-tight">
          It’s not the size of your business, but the boldness of your vision
          that defines success. Businesses of every scale trust our invoicing
          solution to thrive.
        </h2>
        <p className="text-center my-4 text-base md_lg:text-lg italic">
          Trusted already by <span className="font-bold">multiple</span>{" "}
          businesses across Nigeria.{" "}
        </p>
       <div className="flex justify-center my-4">
       <p className="border px-6 py-2 rounded-full flex gap-2 items-center">Available soon in other countries. <Settings className="w-6 h-6 animate-spin text-green-dark" /></p>
       </div>
      </MaxWidthWrapper>
    </section>
  );
}
