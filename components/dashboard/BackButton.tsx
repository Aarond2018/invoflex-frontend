"use client"

import React from 'react'
import { ArrowBigLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

export default function BackButton({}: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button onClick={handleClick} className='flex gap-1 px-4 py-2 border rounded-lg bg-white'>
      <ArrowBigLeft /> Back
    </button>
  )
}