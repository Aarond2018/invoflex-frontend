"use client";

import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader, Trash } from "lucide-react";
import { cn, readableDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReactMutation, useReactQuery } from "@/services/apiHelpers";
import { Client, Invoice } from "@/types";
import { InvoiceSchema } from "@/zodSchemas/schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import CreateClientModal from "../CreateClientModal";

type Props = {};

type Item = {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

type ItemKey = keyof Item;

export default function NewIvoiceForm({}: Props) {
  const [dueDate, setDueDate] = useState<Date>();
  const [description, setDescription] = useState<string | undefined>();
  const [client, setClient] = useState<string | undefined>();
  const [items, setItems] = useState<Item[]>([
    {
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ]);
  const [taxApplied, setTaxApplied] = useState<number>(0);
  const [note, setNote] = useState<string | undefined>();
  const [statusTag, setStatusTag] = useState<"DRAFT" | "SENT" | undefined>();

  const { data: clientsData, isSuccess: clientFetched } = useReactQuery<
    Client[]
  >("get-clients", "/clients");

  const { mutate, isPending: creatingInvoice } = useReactMutation<Invoice, any>(
    "/invoices",
    "post"
  );

  const { toast } = useToast();
  const router = useRouter();

  const handleItemChange = (
    index: number,
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { id, value } = event.target;

    const updatedItems = [...items];

    const targetProp = id as ItemKey;

    updatedItems[index][targetProp] = value as never;
    updatedItems[index]["amount"] =
      updatedItems[index]["quantity"] * updatedItems[index]["rate"];
    setItems(updatedItems);
  };

  const addItemRow = (e: any) => {
    e.preventDefault();
    setItems([...items, { description: "", quantity: 1, rate: 0, amount: 0 }]);
  };

  const deleteItemRow = (index: number) => {
    const updatedItems = items.filter((row, rowIndex) => rowIndex !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (event: any, type: "DRAFT" | "SENT") => {
    event.preventDefault();
    setStatusTag(type);

    const updatedItems = items.map((item) => {
      return {
        amount: +item.amount,
        quantity: +item.quantity,
        rate: +item.rate,
        description: item.description,
      };
    });

    const invoiceObject = {
      description,
      dueDate,
      taxApplied,
      addressedTo: client,
      items: updatedItems,
      note,
      totalAmount:
        items.reduce((total, row) => total + row.amount, 0) +
        items.reduce((total, row) => total + row.amount, 0) *
          (taxApplied / 100),
      status: type,
    };

    const parsedObject = InvoiceSchema.safeParse(invoiceObject);

    if (!parsedObject.data) {
      // const formattedError = Object.values(parsedObject.error.flatten().fieldErrors).flat().join(". ")
      const formattedError = Object.entries(
        parsedObject.error.flatten().fieldErrors
      )
        .map((entry) => entry.join(": "))
        .join(" \n ");
      // console.error(Object.entries(parsedObject.error.flatten().fieldErrors).map(entry => entry.join(": ")).join(" --"))

      return toast({
        variant: "destructive",
        title: "Error!",
        description:
          <p>{formattedError || "Invalid input, check form again"}</p>,
      });
    }

    mutate(
      {
        ...invoiceObject,
        dueDate: invoiceObject.dueDate?.toISOString(),
      },
      {
        onSuccess(data) {
          console.log(data.data.data);

          toast({
            variant: "success",
            title: "Success!",
            description: "Invoice created successfully!",
          });
          setStatusTag(undefined);
          router.push(`/dashboard/invoices/[${data.data.data._id}]`);
        },
        onError(error) {
          console.log("error-----", error);
          toast({
            variant: "destructive",
            title: "Error!",
            description:
              error?.response?.data.message ||
              error?.message ||
              "Something went wrong!",
          });
          setStatusTag(undefined);
        },
      }
    );
  };

  return (
    <form className="my-8">
      <div className="border-b">
        <div className="bg-gray py-2 px-6 inline rounded-sm text-white">
          <span>Draft</span>
        </div>

        <textarea
          rows={2}
          className="my-8 flex w-full max-w-[35rem] border p-2 placeholder:text-sm"
          placeholder="Add description ..."
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          value={description}
        />
      </div>

      <div className="my-4 pb-6 flex flex-col gap-10 md_lg:flex-row border-b">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold">From: </p>
            <Link href="/dashboard/settings" className="underline text-sm">
              Edit Profile
            </Link>
          </div>
          <div className="my-2 flex flex-col text-sm">
            <span>Aaron Damilola</span>
            <span>32, Coates street Yaba Lagos Nigeria</span>
            <span>+234558948493939</span>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold items-center">To: </p>
            <CreateClientModal>
              <span className="underline text-sm cursor-pointer">
                New Client
              </span>
            </CreateClientModal>
          </div>
          <Select value={client} onValueChange={setClient}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              {clientFetched ? (
                clientsData.data.data.map((client: Client) => (
                  <SelectItem key={client._id} value={client._id}>
                    {client.name}
                  </SelectItem>
                ))
              ) : (
                <p className="flex">
                  <Loader className="w-8 h-8 animate-spin my-8 mx-auto" />
                </p>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="">
            <p className="font-semibold">Date</p>
            <span className="text-sm">{readableDate(new Date(Date.now()).toString())}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Due Date</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="my-4 border-b">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actions</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rate(&#8358;)</TableHead>
              <TableHead>Amount(&#8358;)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {items.length === 1 ? (
                    <Trash className="w-6 h-6 text-gray cursor-not-allowed" />
                  ) : (
                    <Trash
                      className="w-6 h-6 cursor-pointer text-red"
                      onClick={() => deleteItemRow(index)}
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <textarea
                    rows={2}
                    placeholder="Item name"
                    className="border p-2 min-w-[15rem]"
                    id="description"
                    value={item.description}
                    onChange={(event) => handleItemChange(index, event)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    min={1}
                    placeholder="Quantity"
                    className="p-2 border"
                    id="quantity"
                    value={item.quantity}
                    onChange={(event) => handleItemChange(index, event)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    placeholder="0"
                    className="p-2 border"
                    id="rate"
                    value={item.rate}
                    onChange={(event) => handleItemChange(index, event)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <input
                    type="text"
                    placeholder="0"
                    className="p-2 border bg-white disabled:cursor-not-allowed"
                    value={item.amount.toLocaleString()}
                    disabled={true}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="my-4 flex flex-col md_lg:flex-row justify-between gap-6">
          <div>
            <button
              onClick={addItemRow}
              className="py-2 px-6 rounded bg-yellow text-white"
            >
              Add New Item
            </button>
          </div>
          <div>
            <div className="flex gap-2 mb-2">
              <p>
                <span className="font-semibold">Sub-total: </span>{" "}
                <span className="">
                  &#8358;
                  {items
                    .reduce((total, row) => total + row.amount, 0)
                    .toLocaleString()}
                </span>
              </p>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <label htmlFor="tax" className="font-semibold">
                Total tax(%):
              </label>
              <input
                type="number"
                className="p-2 border"
                value={taxApplied}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTaxApplied(+e.target.value)
                }
              />
            </div>
            <div className="flex gap-2">
              <p>
                <span className="font-semibold">Total:</span>{" "}
                <span className="text-xl">
                  &#8358;
                  {(
                    items.reduce((total, row) => total + row.amount, 0) +
                    items.reduce((total, row) => total + row.amount, 0) *
                      (taxApplied / 100)
                  ).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 py-4 border-b">
        <label htmlFor="note" className="font-semibold">
          Invoice Note:{" "}
        </label>
        <textarea
          rows={5}
          className="border flex mt-2 w-full p-2"
          value={note}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setNote(e.target.value)
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 my-8 justify-end">
        <button
          className="p-2 px-6 bg-gray text-white rounded disabled:bg-slate-200 cursor-pointer"
          onClick={(event) => handleSubmit(event, "DRAFT")}
          disabled={creatingInvoice}
        >
          {statusTag === "DRAFT" ? "Saving..." : "Save draft"}
        </button>
        <button
          className="p-2 px-6 bg-green text-white rounded disabled:bg-slate-200 cursor-pointer"
          onClick={(event) => handleSubmit(event, "SENT")}
          disabled={creatingInvoice}
        >
          {statusTag === "SENT" ? "Sending..." : "Save and Send"}
        </button>
      </div>
    </form>
  );
}
