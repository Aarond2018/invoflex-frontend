import React from 'react'
import MaxWidthWrapper from '@/components/home/MaxWidthWrapper';
import PreviewPageComponent from '@/components/preview/PreviewPageComponent';

type Props = {
  params: {
    invoiceId: string;
  }
}

export default function page({ params }: Props) {
  return (
    <MaxWidthWrapper className='p-4 md_lg:p-8'>
      <PreviewPageComponent id={params.invoiceId} />
    </MaxWidthWrapper>
  )
}