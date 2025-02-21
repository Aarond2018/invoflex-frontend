import React from 'react'
import { getCurrentYear } from '@/lib/utils'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className='flex gap-4 justify-between items-center p-4 text-sm'>
      <p>@InvoFlex{getCurrentYear()}</p>
      <div className='flex gap-1'>
        <p>Privacy policy</p>
        <p>Terms and conditions</p>
      </div>
    </footer>
  )
}