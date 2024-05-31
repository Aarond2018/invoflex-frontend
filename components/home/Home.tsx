import React from 'react'
import { Settings } from 'lucide-react';

type Props = {}

export default function HomePage({}: Props) {
  return (
    <main className='w-full min-h-[80vh] flex justify-center items-center'>
      <div className='w-[90%] max-w-[20rem] my-4 p-8 flex-col items-center gap-4 text-center border'>
        <Settings className='w-16 h-16 mx-auto animate-bounce' />
        <h1 className='text-3xl font-bold'>InvoFlex</h1>
        <p className='italic text-gray font-semibold'>Coming soon!</p>
      </div>
    </main>
  )
}