"use client";

import React from "react";
import DBMainWrap from "../DBMainWrap";
import CardGrid from "../CardGrid";
import { FileClock, FileInput, FileOutput, LineChart, Plus, User } from "lucide-react";
import { useReactQuery } from "@/services/apiHelpers";
import { Client, Invoice } from "@/types";
import CountUp from 'react-countup';
import Link from "next/link";
import ClientsTable from "./ClientsTable";
import CreateClientModal from "../CreateClientModal";

type Props = {};

export default function ClientPageComponent({}: Props) {
  const { isLoading, isError, data, isSuccess } = useReactQuery<Client[]>("get-clients", "/clients")

  if(isLoading) {
    return (<p>Loading...</p>)
  }

  if(isError) {
    return (<p>Something went wrong!</p>)
  }

  // console.log(isSuccess, data?.data.data)

  return (
    <DBMainWrap>
      <div className="py-6">
        <h3>View and manage your clients</h3>
        <div className="my-4 w-full flex gap-4 justify-between items-start">
          <div className="w-full max-w-[15rem] bg-white p-4 flex flex-col gap-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Total Clients</h1>
              <p className="text-xs font-light">Total number of Clients</p>
              </div>
              <User className="w-6 h-6" />
            </div>
            {isSuccess && <p className="text-3xl font-semibold"><CountUp end={data.data.data.length} /></p>}
          </div>
          <CreateClientModal>
            <button className="py-2 px-6 bg-green-dark rounded text-white">New Client</button>
          </CreateClientModal>
        </div>


        <section>
          {isSuccess && (<ClientsTable tableData={data?.data.data} /> )}
        </section>
      </div>
    </DBMainWrap>
  );
}
