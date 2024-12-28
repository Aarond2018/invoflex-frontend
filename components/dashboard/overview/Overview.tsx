"use client";

import React from "react";
import DBMainWrap from "../DBMainWrap";
import { useReactQuery } from "@/services/apiHelpers";
import { AggDataItem, Invoice, UserDashboardData } from "@/types";
import { ArrowRight, Smile } from "lucide-react";
import DBOverviewCard from "../DBOverviewCard";
import { ChartComp } from "./Chart";
import RecentInvoicesTable from "./RecentInvoicesTable";
import Link from "next/link";

type Props = {};

export default function Overview({}: Props) {
  const { isLoading, isError, data, isSuccess } =
    useReactQuery<UserDashboardData>(
      "get-dashboard-data",
      "/dashboard/overview"
    );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong!</p>;
  }

  console.log(isSuccess, data?.data.data);

  return (
    <DBMainWrap>
      <div className="py-4">
        <div className="">
          <h2 className="font-semibold">Hello 👋</h2>
          <p className="font-light text-sm">
            Ready to streamline your invoicing today?
          </p>
        </div>
        <div className="w-full my-4 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <ChartComp aggData={data?.data.data.invoicesAgg as AggDataItem[]} />
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <div className="grid w-full grid-cols-2 gap-2">
              {data?.data.data.invoicesAgg.map((data, index) => (
                <DBOverviewCard
                  key={index}
                  count={data.count}
                  type={data._id}
                  total={data.total}
                />
              ))}
            </div>
            <div className="w-full p-4 h-[7.5rem] bg-gradient-to-r from-[#002c29] via-[#00837b] to-[#002c29] rounded-md flex flex-col justify-center items-center text-white">
              <h2 className="text-xl font-semibold flex items-center gap-1 text-center">Your invoicing journey starts here!<Smile className="w-5 h-5" /> </h2>
              <Link href="/dashboard/invoices" className="font-light underline">Get Started!</Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row my-8 gap-4">
          <div className="w-full lg:w-4/6">
            <div className="flex justify-between items-center my-2">
              <h2 className="font-semibold text-base">Recent Invoices</h2>
              <Link href="/dashboard/invoices" className="flex items-center gap-1 text-sm">View All <ArrowRight className="w-4 h04" /></Link>
            </div>
            <RecentInvoicesTable tableData={data?.data.data.recentInvoices as Invoice[]} />
          </div>
          <div className="w-full lg:w-2/6">
            <div className="flex justify-between items-center my-2">
              <h2 className="font-semibold text-base">Recent Clients</h2>
              <Link href="/dashboard/clients" className="flex items-center gap-1 text-sm">View All <ArrowRight className="w-4 h04" /></Link>
            </div>
            <div className="flex flex-col gap-2 bg-white px-2 py-4 text-sm">
              {data?.data.data.clients && data.data.data.clients.length > 0 ? (
                data?.data.data.clients.slice(0, 4).map((client) => (
                  <div className="my-2" key={client._id}>
                    <h3 className="font-medium">{client.name}</h3>
                    <p className="text-xs">{client.email}</p>
                  </div>
                ))
              ) : (
                <p className="text-center">No Clients yet! <Link href="/dashboard/clients" className="font-semibold underline">Create One</Link> </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DBMainWrap>
  );
}
