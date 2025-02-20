import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function DBSettingsPageSkeleton({}: Props) {
  return (
    <section className="w-full py-6">
      <Skeleton className="w-full h-12 max-w-[600px] mx-auto mb-4" />
      <Skeleton className="w-full h-[60vh] max-w-[600px] mx-auto" />
    </section>
  )
}