import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function CardGrid({ children }: Props) {
  return (
    <div className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr));] gap-4 my-4'>
      { children }
    </div>
  )
}