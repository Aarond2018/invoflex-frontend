import React from 'react'
import DBHeader from '@/components/dashboard/DBHeader';
import InvoicePageComponent from '@/components/dashboard/invoices/InvoicePageComponent';

type Props = {
  params: {
    id: string;
  }
}

export default function page({ params }: Props) {
  return (
    <section className='w-full p-4 md_lg:p-8'>
      <DBHeader title={"Invoice"} />
      <InvoicePageComponent id={params.id} />
    </section>
  )
}