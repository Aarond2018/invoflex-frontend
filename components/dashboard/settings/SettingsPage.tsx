"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./ChangePassword";
import UpdateBusiness from "./UpdateBusiness";
import { useReactQuery } from "@/services/apiHelpers";
import { User } from "@/types/user";
import ErrorComponent from "../ErrorComponent";
import DBSettingsPageSkeleton from "@/components/skeletons/DBSettingsPageSkeleton";

type Props = {};

export default function SettingsPage({}: Props) {
  const { data, isSuccess, isLoading, isError } = useReactQuery<User>(
    "get-user-data",
    "/users"
  );

  if (isLoading) return <DBSettingsPageSkeleton />;

  if (isError) {
    return (
      <div className="w-full mt-12 flex justify-center">
        <ErrorComponent queryString="get-user-data" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="account" className="w-full max-w-[600px] mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Business</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        {isSuccess && <UpdateBusiness userData={data.data.data} />}
      </TabsContent>
      <TabsContent value="password">
        <ChangePassword />
      </TabsContent>
    </Tabs>
  );
}
