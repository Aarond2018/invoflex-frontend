import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export default function DBClientsPageSkeleton({}: Props) {
  return (
    <section className="w-full py-6">
      <Skeleton className="w-24 h-6 mb-4" />
      <Skeleton className="w-64 h-36 my-6" />

      <Skeleton className="flex w-full h-[50vh] my-8" />
    </section>
  );
}
