import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  // SelectValue,
} from "@/components/ui/select";
import { useReactMutation } from "@/services/apiHelpers";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  id: string;
};

type StatusPayload = {
  status: string;
};

export default function InvoiceAction({ id }: Props) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: changeStatus } = useReactMutation<{}, StatusPayload>(
    `/invoices/${id}`,
    "patch"
  );

  const handleChangeStatus = (status: string) => {
    changeStatus(
      {
        status,
      },
      {
        onSuccess(data) {
          console.log(data.data);
          toast({
            variant: "success",
            title: "Success!",
            description: `Invoice Status Changed to ${status.toLowerCase()} Successfully!`,
          });
          queryClient.invalidateQueries({ queryKey: ["get-single-invoice"] });
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

  const handleAction = (action: string) => {
    switch (action) {
      case "PREVIEW":
        console.log("Preview!!");
        break;
      case "DRAFT":
        handleChangeStatus("DRAFT");
        break;
      case "PAID":
        handleChangeStatus("PAID");
        break;
      case "REMINDER":
        console.log("Reminder!!");
        break;
      case "RESEND":
        console.log("Resend!!");
        break;
      default:
        console.warn("Unknown action selected");
    }

    //this is to ensure the Select component is stateless
    setSelectedAction(null);
  };

  return (
    <Select
      value={selectedAction as string}
      onValueChange={(value) => handleAction(value)}
    >
      <SelectTrigger className="w-[120px]">
        {/* <SelectValue placeholder="Actions" /> */}
        <span className="">Actions</span>
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        <SelectItem value="PREVIEW" className="cursor-pointer">
          Public Preview
        </SelectItem>
        <SelectItem value="DRAFT" className="cursor-pointer">
          Mark as Draft
        </SelectItem>
        <SelectItem value="PAID" className="cursor-pointer">
          Mark as Paid
        </SelectItem>
        <SelectItem value="REMINDER" className="cursor-pointer">
          Send Reminder
        </SelectItem>
        <SelectItem value="RESEND" className="cursor-pointer">
          Resend Invoice
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
