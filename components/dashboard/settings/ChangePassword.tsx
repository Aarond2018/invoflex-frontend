"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema } from "@/zodSchemas/schema";

import { useReactMutation } from "@/services/apiHelpers";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

type PasswordInputs = {
  password: string;
  newPassword: string;
}

export default function ChangePassword({}: Props) {
  const { mutate, isPending } = useReactMutation<
    {},
    PasswordInputs
  >("/users/updatePassword", "patch");

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordInputs>({ resolver: zodResolver(PasswordSchema) });

  const onSubmit: SubmitHandler<PasswordInputs> = (data) => {
    mutate(
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        onSuccess(data) {          
          toast({
            variant: "success",
            title: "Success!",
            description: "Password changed successfully!",
          });

          reset();
        },
        onError(error) {
          toast({
            variant: "destructive",
            title: "Error!",
            description:
              error?.response?.data.message ||
              error?.message ||
              "Something went wrong!",
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-6 py-8 bg-white rounded-md flex flex-col items-center my-4"
    >
      <h1 className="text-xl font-semibold text-center">Change Password</h1>
      <p className="text-sm text-gray my-1 text-center">
        Please enter your current password to change your password.
      </p>
    
      <div className="w-full flex flex-col gap-1 my-4">
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <div className="w-full border relative">
          <input
            type="password"
            id="password"
            className="border rounded-md w-full text-sm p-2 focus:outline-none"
            {...register("password")}
          />
        </div>
        {errors.password?.message && (
          <p className="text-xs italic text-red text-right">
            {errors.password?.message}
          </p>
        )}
      </div>
    
      <div className="w-full flex flex-col gap-1 my-4">
        <label htmlFor="newPassword" className="text-sm font-semibold">
          New Password
        </label>
        <div className="w-full border relative">
          <input
            type="password"
            id="newPassword"
            className="border rounded-md w-full text-sm p-2 focus:outline-none"
            {...register("newPassword")}
          />
        </div>
        {errors.newPassword?.message && (
          <p className="text-xs italic text-red text-right">
            {errors.newPassword?.message}
          </p>
        )}
      </div>
      
      <button
        disabled={isPending}
        className="p-2 w-full bg-dark text-white font-medium my-4 rounded-md disabled:bg-gray disabled:cursor-not-allowed"
      >
        {isPending ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
}
