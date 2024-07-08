import React from 'react'
import DBHeader from '@/components/dashboard/DBHeader'
import NewInvoice from '@/components/dashboard/invoices/NewInvoice'

type Props = {}

export default function page({}: Props) {
  return (
    <section className='w-full p-4 md_lg:p-8'>
      <DBHeader title={"New Invoice"} />
      <NewInvoice />
    </section>
  )
}