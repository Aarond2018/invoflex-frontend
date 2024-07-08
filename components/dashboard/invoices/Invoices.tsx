"use client";

import React from "react";
import DBMainWrap from "../DBMainWrap";
import CardGrid from "../CardGrid";
import { FileClock, FileInput, FileOutput, LineChart, Plus } from "lucide-react";
import { useReactQuery } from "@/services/apiHelpers";
import { Invoice } from "@/types";
import InvoicesTable from "./InvoiceTable";
import CountUp from 'react-countup';
import Link from "next/link";

type Props = {};

export default function Invoices({}: Props) {
  const { isLoading, isError, data, isSuccess } = useReactQuery<Invoice[]>("get-invoices", "/invoices")

  if(isLoading) {
    return (<p>Loading...</p>)
  }

  if(isError) {
    return (<p>Something went wrong!</p>)
  }

  console.log(isSuccess, data?.data.data)

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
            <p className="text-3xl font-semibold"><CountUp end={100} /></p>
          </div>
          <div className="w-full bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Invoices Sent</h1>
              <p className="text-xs font-light">Currently sent invoices</p>
              </div>
              <FileOutput className="w-6 h-6" />
            </div>
            <p className="text-3xl font-semibold">&#8358;<CountUp end={20000} /></p>
          </div>
          <div className="w-full bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Paid Invoices</h1>
              <p className="text-xs font-light">Total amount received</p>
              </div>
              <FileInput className="w-6 h-6" />
            </div>
            <p className="text-3xl font-semibold">&#8358;<CountUp end={1000} /></p>
          </div>
          <div className="w-full bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Overdue Invoices</h1>
              <p className="text-xs font-light">Total outstanding amount</p>
              </div>
              <FileClock className="w-6 h-6" />
            </div>
            <p className="text-3xl font-semibold">&#8358;<CountUp end={1200} /></p>
          </div>
        </CardGrid>

        <section className="my-6 ">
          <h1 className="text-lg font-semibold my-4">Get Started, Aaron.</h1>
          <hr />
          <Link href="/dashboard/invoices/new" className="w-full max-w-[30rem] p-4 flex gap-2 items-center border rounded-lg my-6 bg-white">
            <div className="p-2 rounded-full bg-green-light"><Plus className="w-8 h-8 text-green-dark" /></div>
            <div className="flex flex-col">
              <h3 className="font-semibold">Create a new invoice</h3>
              <p className="text-sm font-light">Generate professional invoices in seconds</p>
            </div>
          </Link>
        </section>

        <section>
          {isSuccess && (<InvoicesTable tableData={data?.data.data} /> )}
        </section>
      </div>
    </DBMainWrap>
  );
}
