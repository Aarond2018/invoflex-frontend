"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

type Props = {};

export default function OnboardForm({}: Props) {
  const [value, setValue] = useState<string>();

  return (
    <div className="w-[95%] max-w-[64rem] px-4 py-4 bg-white rounded-md flex flex-col gap-4">
      <div className="bg-[#F9FAFB] px-4 py-6 w-full">
        <h3 className="text-xl font-semibold mb-4">Welcome to invoflex 👋</h3>
        <p className="text-gray text-sm">
          Fill up this form to get your account up and running.
        </p>
      </div>
      <form className="">
        <h1 className="text-xl font-semibold">Complete onboarding</h1>
        <p className="text-sm text-gray my-2">Enter some more information</p>
        <div className="w-full flex flex-col gap-1 my-4">
          <label htmlFor="busName" className="text-sm font-semibold">
            Business Name
          </label>
          <input
            type="text"
            id="busName"
            className="border rounded-md w-full p-2 text-sm focus:outline-none"
          />
        </div>
        <div className="w-full flex flex-col gap-1 my-4">
          <label htmlFor="address" className="text-sm font-semibold">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="border rounded-md w-full p-2 text-sm focus:outline-none"
          />
        </div>
        <div className="w-full flex flex-col gap-1 my-4">
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone
          </label>
          <PhoneInput
            id="phone"
            className="border rounded-md w-full p-2 text-sm"
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="w-full flex flex-col gap-1 my-4">
          <label htmlFor="logo" className="text-sm font-semibold">
            Logo
          </label>
          <input type="file" id="logo" />
        </div>
      </form>
    </div>
  );
}
