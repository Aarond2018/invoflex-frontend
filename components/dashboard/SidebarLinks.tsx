import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dock, NotebookPen, User, PencilLine, Settings } from "lucide-react";

type Props = {};

export const links = [
  {
    name: "Overview",
    link: "/dashboard",
    icon: <Dock />,
  },
  {
    name: "Invoices",
    link: "/dashboard/invoices",
    icon: <NotebookPen />,
  },
  {
    name: "Clients",
    link: "/dashboard/clients",
    icon: <User />,
  },
  {
    name: "Reports",
    link: "/dashboard/reports",
    icon: <PencilLine />,
  },
  {
    name: "Settings",
    link: "/dashboard/settings",
    icon: <Settings />,
  },
];

export default function SidebarLinks({}: Props) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <ul className="w-full flex flex-col gap-4">
        {links.map((linkObj, index) => (
          <li key={index} className="bg-[#f9fafb] rounded-md">
            <Link
              href={linkObj.link}
              className={`flex gap-2 p-3 rounded-md transition-all hover:font-semibold ${
                pathname === linkObj.link ? "bg-black text-white" : ""
              }`}
            >
              <span>{linkObj.icon}</span>
              <span className="transition-all hidden md_lg:block">
                {linkObj.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
