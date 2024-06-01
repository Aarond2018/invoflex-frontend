import React from 'react'
import SignUpForm from '@/components/auth/SignUpForm'

type Props = {}

export default function SignUp({}: Props) {
  return (
    <section className='min-h-[80vh] flex justify-center items-center'>
      <SignUpForm />
    </section>
  )
}