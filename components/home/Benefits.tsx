import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import bundledMoney from "../../assets/money-bundle.png"
import phoneHeld from "../../assets/phone-held.png"
import coin from "../../assets/coin.png"
import Image from "next/image";

export default function Benefits() {
  return (
    <section className="w-full py-8">
      <MaxWidthWrapper>
        <h2 className="text-center text-lg font-semibold capitalize">
          Experience the Difference with Our InvoFlex
        </h2>
        <div className="w-full my-8 flex flex-col md_sm:flex-row gap-8 text-sm">
          <div className="md_lg:flex-1 w-full relative overflow-hidden h-[15rem] sm:h-[20rem] rounded-md bg-[#f5fef9]">
            <div className="m-6">
              <h3 className="text-xl text-green-dark font-semibold">
                Get Paid Faster
              </h3>
              <p className="text-[#475467] w-full max-w-[30rem] my-2">
                Automate reminders and notifications to ensure clients never
                miss a payment deadline.
              </p>
            </div>
            <Image src={bundledMoney} alt="money"  className="absolute -left-[3rem] bottom-0" />
          </div>
          <div className="md_lg:flex-1 w-full relative overflow-hidden h-[15rem] sm:h-[20rem] rounded-md bg-[#f6fbff]">
            <div className="m-6">
              <h3 className="text-xl text-[#026AA2] font-semibold">
                Professional-Quality Invoices
              </h3>
              <p className="text-[#475467] w-full max-w-[30rem] my-2">
              Create beautifully designed, customizable invoices that reflect your brand.
              </p>
            </div>
            <Image src={phoneHeld} alt="money"  className="absolute left-[0] -bottom-[5rem]" />
          </div>
          
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
