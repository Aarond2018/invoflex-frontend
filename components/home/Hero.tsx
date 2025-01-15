import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { BackgroundLines } from "../ui/background-lines";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { FlipWords } from "../ui/flip-words";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dashboardOverviewImage from "../../public/dashboard_invoices_image.png"
import Image from "next/image";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section className="w-full">
      <MaxWidthWrapper className="overflow-hidden w-full relative flex flex-col items-center">
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 min-h-[80vh] sm:min-h-[90vh]">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-white text-black flex items-center space-x-2"
          >
            <span>InvoFlex v1.0</span>
          </HoverBorderGradient>
          <h2 className="bg-clip-text py-4 text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 text-3xl md_lg:text-5xl lg:text-7xl relative z-20 font-bold tracking-tight">
            Invoice <FlipWords words={["Smarter", "Better__"]} /> <br /> and Get Paid Faster.
          </h2>
          <p className="max-w-xl mx-auto text-base md_lg:text-lg text-neutral-700 text-center">
            Create, manage, and send professional invoices in seconds
          </p>
          <Link href="/auth/signup" className="flex gap-1 py-3 px-8 bg-green my-6 rounded-2xl text-white z-[2] md_sm:mb-[7rem] md_lg:mb-[10rem] xl:mb-[15rem]">Create an account <ArrowRight className="w-6 h-6" /></Link>
        </BackgroundLines>
        <div className="w-[85%] bg-[#eeefee] px-4 pt-4 rounded-lg absolute z-[2] -bottom-[1rem] md_lg:bottom-[-5rem] lg:bottom-[-10rem] xl:bottom-[-10rem]">
          <Image src={dashboardOverviewImage} alt="dashboard-overview-image" className="border rounded-lg w-full" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
