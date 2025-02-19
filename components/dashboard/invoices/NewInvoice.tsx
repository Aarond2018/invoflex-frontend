import React from "react";
import DBMainWrap from "../DBMainWrap";
import BackButton from "../BackButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NewIvoiceForm from "./NewInvoiceForm";

type Props = {};

export default function NewInvoice({}: Props) {
  return (
    <DBMainWrap>
      <div className="w-full py-6">
        <div className="flex justify-between items-center">
          <BackButton />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/invoices">
                  Invoices
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/invoices/new">
                  New Invoice
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* //manage states seperately and parse with zod */}

        <NewIvoiceForm />

      </div>
    </DBMainWrap>
  );
}
