import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MaxWidthWrapper from '../home/MaxWidthWrapper'

type Props = {}

export default function Header({}: Props) {
  return (
    <MaxWidthWrapper>
      <header className='flex gap-4 justify-between items-center px-4'>
      <Link href="/">
        <Image src="/logo/full-logo-black.svg" width={84} height={48} alt="invoflex-logo" className='w-[5.25rem] h-auto' />
      </Link>
      <div className='flex gap-4 items-center z-[2]'>
        <Link href="/auth/login" className=''>Log In</Link>
        <Link href="/auth/signup" className='bg-dark px-8 py-2 rounded-md text-white'>Sign up</Link>
      </div>
    </header>
    </MaxWidthWrapper>
  )
}