"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/zodSchemas/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { SignUpInputs } from "@/types/auth";

type Props = {};

//footer

export default function SignUpForm({}: Props) {
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>(/* { resolver: zodResolver(SignUpSchema) } */);

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[95%] max-w-[32rem] px-6 py-8 bg-white rounded-md flex flex-col items-center"
    >
      <h1 className="text-2xl font-semibold">Sign up to your account</h1>
      <p className="text-sm text-gray my-2">
        Let&apos;s get you started. Create an account to begin.
      </p>
      <div className="w-full flex flex-col gap-1 my-4">
        <label htmlFor="email" className="text-sm font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="border rounded-md w-full p-2 text-sm focus:outline-none"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-xs italic text-red text-right">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col gap-1 my-4">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border rounded-md w-full p-2 text-sm focus:outline-none"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email?.message && (
          <p className="text-xs italic text-red text-right">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col gap-1 my-4">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <div className="w-full border relative">
          <input
            type={passwordType}
            id="password"
            className="border rounded-md w-full text-sm p-2 focus:outline-none"
            {...register("password")}
          />
          {passwordType === "password" ? (
            <Eye
              className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordType("text")}
            />
          ) : (
            <EyeOff
              className="w-4 h-4 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordType("password")}
            />
          )}
        </div>
        {errors.password?.message && (
          <p className="text-xs italic text-red text-right">
            {errors.password?.message}
          </p>
        )}
      </div>

      <div className="flex w-full items-center space-x-2 my-2">
        <Checkbox id="terms" {...register("terms")} className="data-[state=checked]:bg-green border-gray" />
        {/* <input type="checkbox" id="terms" {...register("terms")} /> */}
        {/* <input
          type="text"
          id="email"
          className="border rounded-md w-full p-2 text-sm focus:outline-none"
          {...register("terms", {
            required: "Email is required",
          })}
        /> */}
        <label
          htmlFor="terms"
          className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        {errors.terms?.message && (
          <p className="text-xs italic text-red text-right">
            {errors.terms?.message}
          </p>
        )}
      </div>
      <button className="p-2 w-full bg-dark text-white font-medium my-4 rounded-md">
        Sign up
      </button>
      <p className="text-sm my-2">
        Do you have an account?{" "}
        <Link href="/auth/login" className="font-semibold">
          {" "}
          LogIn
        </Link>
      </p>
    </form>
  );
}