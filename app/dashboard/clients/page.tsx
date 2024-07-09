import React from 'react'
import DBHeader from '@/components/dashboard/DBHeader'
import ClientPageComponent from '@/components/dashboard/clients/ClientsPageComponent'

type Props = {}

export default function page({}: Props) {
  return (
    <section className='w-full p-4 md_lg:p-8'>
      <DBHeader title={"Clients"} />
      <ClientPageComponent />
    </section>
  )
}
