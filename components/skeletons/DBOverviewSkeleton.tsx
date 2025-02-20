import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function DBOverviewSkeleton({}: Props) {
  return (
    <section className="w-full py-6">
      <Skeleton className="w-12 h-6 mb-2" />
      <Skeleton className="w-24 h-6" />
      <div className="my-6 flex flex-col lg:flex-row gap-6">
        <Skeleton className="w-full lg:w-1/2 h-36 lg:h-64" />
        <Skeleton className="w-full lg:w-1/2 h-36 lg:h-64" />
      </div>
      <div className="my-6 flex flex-col lg:flex-row gap-6">
        <Skeleton className="w-full lg:w-4/5 h-36 lg:h-64" />
        <Skeleton className="w-full lg:w-1/5 h-36 lg:h-64" />
      </div>
    </section>
  );
}
