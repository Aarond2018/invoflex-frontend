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
import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';

import Link from 'next/link';
import { Client, Invoice } from '@/types';
import TableStatusTag from '../TableStatusTag';
import DeleteInvoiceModal from './DeleteInvoiceModal';

type Props = {
  tableData: Invoice[]
}

export const columns: ColumnDef<Invoice>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Invoice No',
    cell: ({ row }) => (
      <div className='capitalize'>
        {/* <Link href={`/brand/posts/review/${row.original._id}`}><p className='font-semibold text-[#101828]'>{row.original.title}</p></Link> */}
        <Link href={`/dashboard/invoices/${row.original._id}`} className='font-semibold text-[#101828]'>{row.original._id}</Link>
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
    accessorKey: 'addressedTo',
    header: 'Client Name',
    cell: ({ row }) => {
      // const niches = row.getValue('niche') as string[]

      const clientName = row.original.addressedTo as Client

      return (
        // <div className='capitalize'>{niches[0]}</div>
        <div className='capitalize'>{clientName.name}</div>
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
  
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='capitalize'>
        <div className='w-full'>
          <div className='flex gap-2'>
            {/* <button className='p-2 rounded flex justify-center items-center transition-all bg-green-light text-green-dark hover:bg-green hover:text-white'><Pencil className='w-4 h-4' /></button> */}
            <DeleteInvoiceModal id={row.original._id}>
              <button className='p-2 rounded flex justify-center items-center transition-all bg-red-100 text-red hover:bg-red hover:text-white'><Trash className='w-4 h-4' /></button>
            </DeleteInvoiceModal>
          </div>
        </div>
      </div>
    ),
  },
];

export default function InvoicesTable( { tableData } : Props  ) {
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
        <div className='m-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='divide-x divide-grayLight rounded-lg border border-grayLight flex'>
            <button className='px-1 py-2 text-sm font-medium flex-1'>View all</button>
            <button className='px-1 py-2 text-sm font-medium flex-1'>Status</button>
            <button className='px-1 py-2 text-sm font-medium flex-1'>
              Niche type
            </button>
          </div>
          <div className='relative flex w-full max-w-[24rem] items-center rounded-lg border border-grayLight'>
            <Search className='w-4 h-4 absolute left-2' />
            <Input
              placeholder='Search for Campaign'
              value={
                (table.getColumn('addressedTo')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('addressedTo')?.setFilterValue(event.target.value)
              }
              className='h-full w-full border-none py-2 pl-8 focus:ring-[none]'
            />
          </div>
        </div>
        
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
      <div className="flex items-center justify-end space-x-2 pt-4 pb-8">
        <div className="flex-1 text-sm text-muted-foreground px-2">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}