import React from "react";

type Props = {
  status: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
};

export default function TableStatusTag({ status }: Props) {
  return (
    <div
      className={`px-4 py-2 rounded-full font-semibold text-xs text-center ${
        status === "DRAFT"
          ? "bg-gray"
          : status === "SENT"
          ? "bg-yellow-light text-yellow"
          : status === "PAID"
          ? "bg-green-light text-green-dark"
          : "bg-red-100 text-red"
      }`}
    >
      <span>{status}</span>
    </div>
  );
}
