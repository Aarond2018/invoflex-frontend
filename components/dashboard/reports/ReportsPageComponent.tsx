"use client";

import React, { useState } from "react";
import DBMainWrap from "../DBMainWrap";
import { useReactMutation, useReactQuery } from "@/services/apiHelpers";
import { Client, Invoice } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { format, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import ReportsTable from "./ReportsTable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadReport } from "../DownloadReport";
import ErrorComponent from "../ErrorComponent";
import DBReportsPageSkeleton from "@/components/skeletons/DBReportsPageSkeleton";

type Props = {};

type ReportObj = {
  status?: string;
  addressedTo?: string;
  dateFrom?: string;
  dateTo?: string;
};

export default function ReportsPageComponent({}: Props) {
  const [status, setStatus] = useState<string>("all");
  const [clientType, setClientType] = useState<string>("all");
  const [client, setClient] = useState<string | undefined>();
  const [period, setPeriod] = useState<string>("allTime");

  const [dateFrom, setDateFrom] = React.useState<Date | undefined>(new Date());
  const [dateTo, setDateTo] = React.useState<Date | undefined>(new Date());

  const { toast } = useToast();

  const {
    data: clientsData,
    isSuccess: clientFetched,
    isLoading,
    isError,
  } = useReactQuery<Client[]>("get-clients", "/clients");

  const {
    mutate,
    isPending,
    isSuccess,
    data: reportData,
  } = useReactMutation<Invoice[], ReportObj>("/reports", "post");

  if (isLoading) {
    return <DBReportsPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full mt-12 flex justify-center">
        <ErrorComponent queryString="get-clients" />
      </div>
    );
  }

  const generateReport = () => {
    const reportObj = {
      status: status === "all" ? undefined : status,
      addressedTo:
        clientType === "all" ? undefined : !client ? undefined : client,
      dateFrom: period === "allTime" ? undefined : dateFrom?.toISOString(),
      dateTo: period === "allTime" ? undefined : dateTo?.toISOString(),
    };

    mutate(reportObj, {
      onSuccess(data) {

        toast({
          variant: "success",
          title: "Success!",
          description: "Report generated successfully!",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Error!",
          description:
            error?.response?.data.message ||
            error?.message ||
            "Something went wrong!",
        });
      },
    });
  };

  return (
    <DBMainWrap>
      <div className="py-6">
        <p className="mb-6">Generate Report</p>

        <div className="flex flex-col md_sm:flex-row gap-6 md_sm:gap-10">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Status</p>
              <Select value={status} onValueChange={(val) => setStatus(val)}>
                <SelectTrigger className="w-full max-w-[20rem]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="DRAFT">DRAFT</SelectItem>
                  <SelectItem value="SENT">SENT</SelectItem>
                  <SelectItem value="PAID">PAID</SelectItem>
                  <SelectItem value="OVERDUE">OVERDUE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 flex-col">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Clients</p>
                <Select
                  value={clientType}
                  onValueChange={(val) => setClientType(val)}
                >
                  <SelectTrigger className="w-full max-w-[20rem]">
                    <SelectValue placeholder="All Clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    <SelectItem value="single">Single Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {clientType === "single" ? (
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Clients</p>

                  <Select value={client} onValueChange={setClient}>
                    <SelectTrigger className="w-full max-w-[20rem]">
                      <SelectValue placeholder="Clients" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientFetched ? (
                        clientsData.data.data.map((client: Client) => (
                          <SelectItem key={client._id} value={client._id}>
                            {client.name}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="flex">
                          <Loader className="w-8 h-8 animate-spin my-8 mx-auto" />
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Period</p>
              <Select value={period} onValueChange={(val) => setPeriod(val)}>
                <SelectTrigger className="w-full max-w-[20rem]">
                  <SelectValue placeholder="All Clients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allTime">All Time</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {period === "custom" && (
              <div className="flex w-full flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">From</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? (
                          format(dateFrom, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="hidden sm:flex">-</div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">To</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? (
                          format(dateTo, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 md_sm:flex-row justify-between my-8">
          <button
            onClick={generateReport}
            disabled={isPending}
            className="py-2 px-6 bg-green-dark text-white font-semibold text-sm rounded disabled:bg-gray"
          >
            Generate Report
          </button>
          {isSuccess && (
            <PDFDownloadLink
              document={<DownloadReport report={reportData.data.data} />}
              fileName="report.pdf"
              className="py-2 px-6 bg-yellow text-white font-semibold text-sm rounded disabled:bg-gray"
            >
              {({ loading }) => (loading ? "Loading..." : "Download Report!")}
            </PDFDownloadLink>
          )}
        </div>

        {isSuccess && <ReportsTable tableData={reportData?.data.data} />}
      </div>
    </DBMainWrap>
  );
}
