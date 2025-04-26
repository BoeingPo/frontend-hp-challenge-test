import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'

import { carObjectType } from "../type";
import { mockData } from "../mockData";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table.tsx"

type dataTableType = {
  dataTable : carObjectType[]
} 

export const TableCarComponent = ({dataTable}:dataTableType) => {

    console.log('inside child',dataTable)

    const data : carObjectType[] = dataTable
    const columnHelper = createColumnHelper<carObjectType>()

    const columns = [
        columnHelper.accessor('carRegistrationNumber', {
          cell: info => info.getValue(),
          header: ()=> 'Car Registration Number',
          footer: info => info.column.id,
        }),
        columnHelper.accessor('carBrand', {
          cell: info => info.getValue(),
          header: () => 'Car Brand',
          footer: info => info.column.id,
        }),
        columnHelper.accessor('carModel', {
          header: () => 'Car Model',
          cell: info => info.renderValue(),
          footer: () => 'Car Model',
        }),
        columnHelper.accessor('note', {
          header: () => 'note',
          footer: () => 'note',
        })
      ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    return(
        <div className="p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableHeader>
          {table.getFooterGroups().map(footerGroup => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </Table>
      <div className="h-4" />
    </div>
    );
};