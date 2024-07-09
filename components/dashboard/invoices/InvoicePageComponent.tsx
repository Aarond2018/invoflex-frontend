"use client";

import React from "react";

import { readableDate } from "@/lib/utils";
import DBMainWrap from "../DBMainWrap";
import BackButton from "../BackButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useReactQuery } from "@/services/apiHelpers";
import { Invoice } from "@/types";

type Props = {
  id: string;
};

export default function InvoicePageComponent({ id }: Props) {
  const { data, isPending, isSuccess } = useReactQuery<Invoice>(
    "get-single-invoice",
    `/invoices/${id}`
  );

  if (isPending) {
    return <p>Loading....</p>;
  }

  return (
    <DBMainWrap>
      <div className="w-full py-6">
        <div className="flex justify-between items-center">
          <BackButton />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/invoices">
                  Invoices
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashboard/invoices/${id}`}>
                  Review Invoice
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className="my-8">
          <div className="border-b">
            {isSuccess && (
              <div
              className={`py-2 px-6 inline rounded ${
                data.data.data.status === "DRAFT"
                  ? "bg-gray text-white"
                  : data.data.data.status === "SENT"
                  ? "bg-yellow-light text-yellow"
                  : data.data.data.status === "PAID"
                  ? "bg-green-light text-green-dark"
                  : "bg-red-100 text-red"
              }`}
            >
              <span>{data.data.data.status}</span>
            </div>
            )}

            <p className="my-8 flex w-full max-w-[35rem]">
              {isSuccess && data.data.data.description}
            </p>
          </div>

          <div className="my-4 pb-6 flex flex-col gap-10 md_lg:flex-row border-b">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold">From: </p>
              </div>
              <div className="my-2 flex flex-col text-sm">
                {isSuccess && typeof data.data.data.createdBy !== "string" && (
                  <>
                    <span>{data.data.data.createdBy.name}</span>
                    <span>{data.data.data.createdBy.email}</span>
                    <span>{data.data.data.createdBy.address}</span>
                    <span>{data.data.data.createdBy.phone}</span>
                  </>
                )}
              </div>
              <div className="flex justify-between">
                <p className="font-semibold items-center">To: </p>
              </div>
              <div className="my-2 flex flex-col text-sm">
                {isSuccess &&
                  typeof data.data.data.addressedTo !== "string" && (
                    <>
                      <span>{data.data.data.addressedTo.name}</span>
                      <span>{data.data.data.addressedTo.email}</span>
                      <span>{data.data.data.addressedTo.address}</span>
                    </>
                  )}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="">
                <p className="font-semibold">Date</p>
                <span className="text-sm">
                  {isSuccess && readableDate(data.data.data.createdAt)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Due Date</span>
                <span className="text-sm">
                  {isSuccess && readableDate(data.data.data.dueDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="my-4 border-b">
            {isSuccess && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Rate(&#8358;)</TableHead>
                    <TableHead>Amount(&#8358;)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.data.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <p className="min-w-[15rem]">{item.description}</p>
                      </TableCell>
                      <TableCell>
                        <p>{item.quantity}</p>
                      </TableCell>
                      <TableCell>
                        <p>{item.rate.toLocaleString()}</p>
                      </TableCell>
                      <TableCell>{(item.quantity * item.rate).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {isSuccess && (
              <div className="my-4 flex gap-6">
                <div>
                  <div className="flex gap-2 mb-2">
                    <p>
                      <span className="font-semibold">Sub-total: </span>{" "}
                      <span className="">&#8358;
                        {data.data.data.items
                          .reduce(
                            (total, row) => total + row.quantity * row.rate,
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <p className="font-semibold">Total tax(%):</p>
                    <p>{data.data.data.taxApplied}</p>
                  </div>
                  <div className="flex gap-2">
                    <p>
                      <span className="font-semibold">Total:</span>{" "}
                      <span className="text-xl">&#8358;
                        {(
                          data.data.data.items.reduce(
                            (total, row) => total + row.quantity * row.rate,
                            0
                          ) +
                          data.data.data.items.reduce(
                            (total, row) => total + row.quantity * row.rate,
                            0
                          ) *
                            (data.data.data.taxApplied / 100)
                        ).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="my-4 py-4 border-b">
            <p className="font-semibold">Invoice Note: </p>
            <p className="mt-2">{isSuccess && data.data.data.note}</p>
          </div>
        </section>
      </div>
    </DBMainWrap>
  );
}
