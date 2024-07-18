"use client";

import React, { useState } from "react";

import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateBusinessSchema } from "@/zodSchemas/schema";
import { UpdateBusinessInputs } from "@/types/auth";
import { useReactMutation } from "@/services/apiHelpers";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

import { User } from "@/types/user";

type Props = {
  userData: User;
};

export default function UpdateBusiness({ userData }: Props) {
  const [phone, setPhone] = useState<string | undefined>(userData.phone);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useReactMutation<User, {}>(
    "/users/update-user",
    "patch"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdateBusinessInputs>({
    resolver: zodResolver(UpdateBusinessSchema),
    defaultValues: {
      name: userData.name,
      businessName: userData.businessName,
      address: userData.address,
    },
  });

  const logo = watch("logo");

  const onSubmit: SubmitHandler<UpdateBusinessInputs> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("businessName", data.businessName);
    formData.append("address", data.address);
    phone && formData.append("phone", phone);

    data &&
      data.logo &&
      Object.values(data.logo).map((file) => {
        formData.append("logo", file);
      });

    mutate(formData, {
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ["get-user-data"] });
        toast({
          variant: "success",
          title: "Success!",
          description: "User data updated successfully!",
        });
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
    });
  };

  return (
    <div className="w-full px-4 py-4 bg-white rounded-md flex flex-col gap-4">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-semibold text-center">
          Edit Business Information
        </h1>
        <p className="text-sm text-gray mt-1 mb-4 text-center">
          Update your business information here.
        </p>
        <div className="w-full flex flex-col gap-1 my-4">
          <label htmlFor="name" className="text-sm font-semibold">
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
          <label htmlFor="busName" className="text-sm font-semibold">
            Business Name
          </label>
          <input
            type="text"
            id="busName"
            className="border rounded-md w-full p-2 text-sm focus:outline-none"
            {...register("businessName")}
          />
          {errors.businessName?.message && (
            <p className="text-xs italic text-red text-right">
              {errors.businessName?.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1 my-4">
          <label htmlFor="address" className="text-sm font-semibold">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="border rounded-md w-full p-2 text-sm focus:outline-none"
            {...register("address")}
          />
          {errors.address?.message && (
            <p className="text-xs italic text-red text-right">
              {errors.address?.message}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1 my-4">
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone
          </label>
          <PhoneInput
            id="phone"
            className="border rounded-md w-full p-2 text-sm"
            value={phone}
            onChange={setPhone}
          />
        </div>
        <div className="w-full flex flex-col gap-1 my-4">
          <p className="text-sm font-semibold">Logo</p>
          <input
            type="file"
            id="logo"
            className="hidden"
            {...register("logo")}
          />
          {errors.logo?.message && (
            <p className="text-xs italic text-red text-right">
              {errors.logo?.message}
            </p>
          )}
          <div className="flex gap-4">
            <label
              htmlFor="logo"
              className="w-24 h-24 bg-[#F9FAFB] border border-dashed cursor-pointer flex justify-center items-center text-xs text-center"
            >
              Select Image
            </label>
            <div className="w-36 h-24 border">
              {(logo && logo.length > 0) ? (
                <Image
                  src={URL.createObjectURL(logo[0])}
                  alt="logo"
                  width={200}
                  height={120}
                  className="w-full h-full object-cover"
                />
              ) : userData.logo ? (
                <Image
                  src={userData.logo}
                  width={144}
                  height={96}
                  alt="user-image"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>
        <button
          className="p-2 w-full bg-dark text-white font-medium my-8 rounded-md disabled:bg-gray disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {!isPending ? "Save" : "Saving..."}
        </button>
      </form>
    </div>
  );
}
