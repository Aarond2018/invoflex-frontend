import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useReactMutation } from "@/services/apiHelpers";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
  id: string;
};

export default function DeleteClientModal({ children, id }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { mutate, isPending } = useReactMutation(`/clients/${id}`, "delete");
  const queryClient = useQueryClient()

  const { toast } = useToast();

  const handleDelete = () => {
    mutate(
      {},
      {
        onSuccess(data) {
          console.log(data);

          toast({
            variant: "success",
            title: "Success!",
            description: "Client deleted successfully!",
          });
          queryClient.invalidateQueries({ queryKey: ['get-clients'] })
          setOpenModal(false);
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
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <span className="text-sm mt-1 mb-4">
              Do you really want to delete this client?
            </span>
          </DialogDescription>
          <div className="w-full flex gap-4">
            <DialogClose asChild>
              <button className="flex-1 bg-green-dark py-2 px-4 text-white rounded my-8 mb-4" disabled={isPending}>
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red py-2 px-4 text-white rounded mt-8 mb-4 disabled:bg-gray disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
