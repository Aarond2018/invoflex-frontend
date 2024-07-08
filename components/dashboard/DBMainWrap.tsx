import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode;
}

export default function DBMainWrap({ children }: Props) {
  return (
    <section className='w-full max-w-screen-xl '>
      { children }
    </section>
  )
}