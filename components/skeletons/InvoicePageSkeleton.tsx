import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function InvoicePageSkeleton({}: Props) {
  return (
    <section className="w-full py-6">
      <Skeleton className="w-64 h-8 mb-4" />
      <div className="my-4 flex justify-end">
        <Skeleton className="w-64 h-12" />
      </div>
      <Skeleton className="w-48 h-8 my-4" />
      <Skeleton className="w-64 h-8 my-4" />

      <Skeleton className="w-full h-[60vh] my-8" />
    </section>
  );
}
