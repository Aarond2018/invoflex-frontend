import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import bg from "../../assets/dashboard-gradient-2.png";

export default function Contact() {
  return (
    <section className="w-full mb-10">
      <MaxWidthWrapper className="flex flex-col gap-2 justify-center items-center p-8 relative min-h-[25rem] text-white text-center">
        <Image
          src={bg}
          alt="bg"
          className="absolute top-0 left-0 w-full h-full -z-[1] md_sm:rounded-lg"
        />
        <h1 className="text-3xl md_sm:text-4xl w-full max-w-[50rem] font-medium leading-tight">
          We’re powering the growth of thousands of businesses. Let us power
          yours too.
        </h1>
        <p className="font-light my-2">
          Create an account today and take the first step toward seamless
          invoicing.
        </p>
        <div className="flex justify-center">
          <p className="border border-white px-8 py-2 my-4 rounded-full text-sm">Call +234 701 234 5678</p>
        </div>
        <p className="font-light">or send us an email at <span className="font-semibold">admin@invoflex.com</span></p>
      </MaxWidthWrapper>
    </section>
  );
}
