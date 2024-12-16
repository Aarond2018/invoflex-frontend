'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Link from 'next/link';
import { Client, Invoice } from '@/types';
import TableStatusTag from '../TableStatusTag';

type Props = {
  tableData: Invoice[]
}

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: 'id',
    header: 'Invoice No',
    cell: ({ row }) => (
      <div className='capitalize'>
        {/* <Link href={`/brand/posts/review/${row.original._id}`}><p className='font-semibold text-[#101828]'>{row.original.title}</p></Link> */}
        <Link href={`/dashboard/invoices/${row.original._id}`} className='font-semibold text-[#101828]'>{`${row.original._id.slice(0, 2)}...${row.original._id.slice(-3)}`}</Link>
        {/* <p>{row.original.mediaOrg}</p> */}
      </div>
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
    cell: ({ row }) => {
      // const niches = row.getValue('niche') as string[]

      return (
        // <div className='capitalize'>{niches[0]}</div>
        <div className='capitalize'>&#8358;{row.original.totalAmount.toLocaleString()}</div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => {
      const dateString = row.original.createdAt
      const formattedDate = new Date(dateString).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      
      return (
        <div className='capitalize'>{formattedDate}</div>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: 'Due date',
    cell: ({ row }) => {
      const dateString = row.original.dueDate
      const formattedDate = new Date(dateString).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      
      return (
        <div className='capitalize'>{formattedDate}</div>
      )
    },
  },
  
  {
    accessorKey: 'status',
    header: 'status',
    cell: ({ row }) => (
      <div className='capitalize'>
        {/* <StatusTag status={row.getValue('status')} /> */}
        <TableStatusTag status={row.original.status} />
      </div>
    ),
  },
  
];

export default function RecentInvoicesTable( { tableData } : Props  ) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});


    const data = tableData

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full bg-white'>
      <div className='rounded-md border border-[#EAECF0] shadow-sm'>
        
        <Table className='border border-grayLight text-[#667085]'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='border border-grayLight bg-[#D0D5DD]/20'
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='font-semibold text-[#667085]'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='border border-grayLight'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}