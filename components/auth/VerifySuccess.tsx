"use client";

import React from "react";
import checkIcon from "@/assets/svgs/check.svg";
import Link from "next/link";
import Image from "next/image";

type Props = {};

export default function VerifySuccess({}: Props) {
  return (
    <div className="w-[95%] max-w-[32rem] px-4 py-4 bg-white rounded-md flex flex-col items-center text-center">
      <Image src={checkIcon} alt="check-icon" className="my-4" />
      <h1 className="text-2xl font-semibold">Hurray! Account verified!</h1>
      <p className="text-sm text-gray my-2">
        Your account has been verified. Please continue to use InvoFlex.
      </p>

      <Link href="/" className="my-4 bg-dark text-white font-semibold text-sm w-full p-2 rounded">
        Continue
      </Link>
    </div>
  );
}
