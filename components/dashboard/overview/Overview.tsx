"use client";

import React from "react";
import DBMainWrap from "../DBMainWrap";
import { useReactQuery } from "@/services/apiHelpers";
import { UserDashboardData } from "@/types";
import { Users } from "lucide-react";
import DBOverviewCard from "../DBOverviewCard";

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
        <div className="w-full my-4 flex gap-4">
          <div className="flex-1 border">{/* pictorial representation */}</div>
          <div className="flex flex-1">
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
          </div>
        </div>
      </div>
    </DBMainWrap>
  );
}
