import React from 'react'
import Hero from './Hero';
import Overview from './Overview';
import Benefits from './Benefits';
import Contact from './Contact';

type Props = {}

export default function HomePage({}: Props) {
  return (
    <main className='w-full'>
      <Hero />
      <Overview />
      <Benefits />
      <Contact />
    </main>
  )
}