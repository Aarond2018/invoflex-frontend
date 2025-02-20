import React from "react";
import DBHeader from "@/components/dashboard/DBHeader";
import SettingsPage from "@/components/dashboard/settings/SettingsPage";

type Props = {};

export default function page({}: Props) {
  return (
    <section className="w-full p-4 md_lg:p-8">
      <DBHeader title={"Settings"} />
      <section className="py-8">
        <SettingsPage />
      </section>
    </section>
  );
}
