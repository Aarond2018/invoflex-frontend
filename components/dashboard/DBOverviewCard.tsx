import React from "react";
import { FileCheck2, FileClock, FileInput, FileOutput, FilePen, Users } from "lucide-react";

type Props = {
  count: number;
  total: number;
  type: string;
}; 

export default function DBOverviewCard({ count, total, type }: Props) {

  const formatCardIcon = (type: string) => {
    if(type === "PAID") return <FileCheck2 className="w-4 h-4" />
    if(type === "DRAFT") return <FilePen className="w-4 h-4" />
    if(type === "OVERDUE") return <FileClock className="w-4 h-4" />
    if(type === "SENT") return <FileOutput className="w-4 h-4" />
  }

  return (
    <div className="border flex items-center justify-between gap-1 text-sm p-4 rounded-md bg-white">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase">Total <span className="capitalize">{type}</span></p>
        <span className="text-lg font-medium">{count}</span>
      </div>
      <div className="p-3 bg-slate-100 rounded-full">
        {/* <Users className="w-4 h-4" /> */}
        {formatCardIcon(type)}
      </div>
    </div>
  );
}
