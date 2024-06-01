import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className='flex gap-4 justify-between items-center p-4 text-sm'>
      <p>@InvoFlex2023</p>
      <div className='flex gap-1'>
        <p>Privacy policy</p>
        <p>Terms and conditions</p>
      </div>
    </footer>
  )
}