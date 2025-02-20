import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function DBReportsPageSkeleton({}: Props) {
  return (
    <section className="w-full py-6">
      <Skeleton className="w-24 h-6 mb-4" />
      <Skeleton className="w-full h-16 my-6" />
      <Skeleton className="w-full h-16 my-6" />

      <Skeleton className="w-36 h-12 mb-12" />
    </section>
  );
}
