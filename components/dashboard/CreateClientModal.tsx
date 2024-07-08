"use client";

import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReactMutation } from "@/services/apiHelpers";
import { Client, ClientInputs } from "@/types";
import { CreateClientSchema } from "@/zodSchemas/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

export default function CreateClientModal({ children }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutate, isPending } = useReactMutation<Client, ClientInputs>("/clients", "post");
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientInputs>({ resolver: zodResolver(CreateClientSchema) });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<ClientInputs> = (data) => {
    mutate(data,{
        onSuccess() {
          toast({
            variant: "success",
            title: "Success",
            description: "Client created Successfully!",
          });
          
          queryClient.invalidateQueries({ queryKey: ['get-clients'] })
          setOpenModal(false)
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
    <Dialog open={openModal} onOpenChange={(val) => setOpenModal(val)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>Create a new client</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border-2 p-2 rounded text-sm"
                {...register("name", {
                  required: "Client's name is required",
                })}
              />
              {errors.name?.message && (
                <p className="text-xs italic text-red text-right">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border-2 p-2 rounded text-sm"
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
            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <textarea
                rows={3}
                id="address"
                className="border-2 p-2 rounded text-sm focus:outline-none"
                {...register("address")}
              />
            </div>
          </div>
          <div className="my-4 flex justify-end">
            <button
              type="submit"
              className="bg-green-dark text-white text-sm py-2 px-6 rounded font-semibold disabled:bg-gray disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Client"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
