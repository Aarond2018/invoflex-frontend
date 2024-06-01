"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/zodSchemas/schema";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { LoginInputs } from "@/types/auth";

type Props = {};

export default function LogInForm({}: Props) {
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[95%] max-w-[32rem] px-6 py-8 bg-white rounded-md flex flex-col items-center"
    >
      <h1 className="text-2xl font-semibold">Log in to your account</h1>
      <p className="text-sm text-gray my-2">
        Welcome back! Sign into your account to continue
      </p>
      <div className="w-full flex flex-col gap-1 my-4">
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border rounded-md w-full p-2 text-sm focus:outline-none"
          {...register("email", {
            required: "Email is required"
          })}
        />
        {errors.email?.message && <p className="text-xs italic text-red text-right">{errors.email?.message}</p>}
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
        {errors.password?.message && <p className="text-xs italic text-red text-right">{errors.password?.message}</p>}
      </div>
      <div className="flex w-full justify-end my-2">
        <Link href="/" className="font-mehium text-sm">
          Forgot Password
        </Link>
      </div>
      <button className="p-2 w-full bg-dark text-white font-medium my-4 rounded-md">
        Sign In
      </button>
      <p className="text-sm my-4">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="font-semibold">
          {" "}
          Sign up
        </Link>
      </p>
    </form>
  );
}
