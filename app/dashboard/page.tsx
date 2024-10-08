import DBHeader from '@/components/dashboard/DBHeader'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <section className='w-full p-4 md_lg:p-8'>
      <DBHeader title={"Overview"} />
      <section className='py-8'>
        <p>Overview page</p>
      </section>
    </section>
  )
}
