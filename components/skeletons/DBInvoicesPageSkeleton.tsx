import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function DBOInvoicesPageSkeleton({}: Props) {
  return (
    <section className="w-full py-6">
      <Skeleton className="w-24 h-6 mb-4" />
      <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr));] gap-4 my-4">
        <Skeleton className="w-full h-36" />
        <Skeleton className="w-full h-36" />
        <Skeleton className="w-full h-36" />
        <Skeleton className="w-full h-36" />
      </div>
      <Skeleton className="w-24 h-6 mb-4" />

      <Skeleton className="flex w-64 h-24 my-8" />

      <Skeleton className="flex w-full h-[50vh] my-8" />
    </section>
  );
}
