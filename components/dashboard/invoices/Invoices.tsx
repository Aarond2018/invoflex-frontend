"use client";

import React from "react";
import DBMainWrap from "../DBMainWrap";
import CardGrid from "../CardGrid";
import {
  FileCheck2,
  FileClock,
  FileInput,
  FileOutput,
  LineChart,
  Plus,
} from "lucide-react";
import { useReactQuery } from "@/services/apiHelpers";
import { Invoice } from "@/types";
import InvoicesTable from "./InvoiceTable";
import CountUp from "react-countup";
import Link from "next/link";
import ErrorComponent from "../ErrorComponent";
import DBOInvoicesPageSkeleton from "@/components/skeletons/DBInvoicesPageSkeleton";

type Props = {};

export default function Invoices({}: Props) {
  const { isLoading, isError, data, isSuccess } = useReactQuery<Invoice[]>(
    "get-invoices",
    "/invoices"
  );

  if (isLoading) {
    return <DBOInvoicesPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full mt-12 flex justify-center">
        <ErrorComponent queryString="get-invoices" />
      </div>
    );
  }

  const filterInvoices = (type: string) => {
    return data?.data.data
      .filter((item) => item.status === type)
      .reduce((acc, cur) => acc + cur.totalAmount, 0);
  };

  return (
    <DBMainWrap>
      <div className="py-6">
        <h3>View and manage all your invoices</h3>
        <CardGrid>
          <div className="w-full bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">Total Invoices</h1>
                <p className="text-xs font-light">Total number of invoices</p>
              </div>
              <LineChart className="w-6 h-6" />
            </div>
            <p className="text-3xl font-semibold">
              <CountUp end={data?.data.data.length as number} />
            </p>
          </div>
          <div className="w-full bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">Invoices Sent</h1>
                <p className="text-xs font-light">Currently sent invoices</p>
              </div>
              <FileOutput className="w-6 h-6" />
            </div>
            <p className="text-3xl font-semibold">
              &#8358;
              <CountUp end={filterInvoices("SENT") as number} />
            </p>
          </div>
          <div className="w-full bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">Paid Invoices</h1>
                <p className="text-xs font-light">Total amount received</p>
              </div>
              <FileCheck2 className="w-6 h-6" />
            </div>
            <p className="text-3xl font-semibold">
              &#8358;
              <CountUp end={filterInvoices("PAID") as number} />
            </p>
          </div>
          <div className="w-full bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">Overdue Invoices</h1>
                <p className="text-xs font-light">Total outstanding amount</p>
              </div>
              <FileClock className="w-6 h-6" />
            </div>
            <p className="text-3xl font-semibold">
              &#8358;
              <CountUp end={filterInvoices("OVERDUE") as number} />
            </p>
          </div>
        </CardGrid>

        <section className="my-6 ">
          <h1 className="text font-semibold my-4">Get Started,</h1>
          <hr />
          <Link
            href="/dashboard/invoices/new"
            className="w-full max-w-[30rem] p-4 flex gap-2 items-center border rounded-lg my-6 bg-white"
          >
            <div className="p-2 rounded-full bg-green-light">
              <Plus className="w-8 h-8 text-green-dark" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold">Create a new invoice</h3>
              <p className="text-sm font-light">
                Generate professional invoices in seconds
              </p>
            </div>
          </Link>
        </section>

        <section>
          {isSuccess && <InvoicesTable tableData={data?.data.data} />}
        </section>
      </div>
    </DBMainWrap>
  );
}
