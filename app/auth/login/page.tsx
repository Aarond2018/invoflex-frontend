import React from 'react'
import LogInForm from '@/components/auth/LogInForm'

type Props = {}

export default function LogIn({}: Props) {
  return (
    <section className='min-h-[80vh] flex justify-center items-center'>
      <LogInForm />
    </section>
  )
}