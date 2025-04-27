import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { carObjectType, paginationType, resCreateCar } from "../type";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { useContext } from "react";
import { CarContext } from "../../context-api/CarProvider";
import { SheetUpdateComponent } from "./SheetUpdateComponent";
import { deleteCarRequest } from "../api/Api";

type dataTableType = {
  dataTable: carObjectType[];
  paginationInfo : paginationType
};

export const TableCarComponent = ({ dataTable,paginationInfo }: dataTableType) => {
  const data: carObjectType[] = dataTable;
  const pageObjectInfo : paginationType = paginationInfo;
  const columnHelper = createColumnHelper<carObjectType>();
  const {fetchData} = useContext(CarContext)!;
  
  const deleteCar = async (rowData : carObjectType):Promise<void> =>{
    try{
      const response: resCreateCar = await deleteCarRequest(rowData);
      
      if (response.success) {
        console.log("Success fully delete");
        fetchData();
      }
    }
    catch (error) {
      console.error(`Request Failed ${error}`);
    }
  } 

  const columns = [
    columnHelper.display({
      id: "no",
      cell: ({row}) => {
        
        const no : number = (row.index + 1) + (pageObjectInfo.pageSize * (pageObjectInfo.page-1))

        return (
        <div className="flex gap-2">
          {no}
        </div>
      )},
      header: () => "No.",
      footer:  () => "No.",
    }),
    columnHelper.display({
      id: "actions",
      cell: ({row}) => (
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger className="font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg">
              Update
            </SheetTrigger>
            <SheetContent>
              <SheetUpdateComponent updateData={row.original} />
            </SheetContent>
          </Sheet>
          <button
            onClick={() => {deleteCar(row.original)}}
            className="text-black bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
      header: () => "Actions",
      footer:  () => "Actions",
    }),
    columnHelper.accessor("carRegistrationNumber", {
      cell: (info) => info.getValue(),
      header: () => "Car Registration Number",
      footer: () => "Car Registration Number",
    }),
    columnHelper.accessor("carBrand", {
      cell: (info) => info.getValue(),
      header: () => "Car Brand",
      footer: () => "Car Brand",
    }),
    columnHelper.accessor("carModel", {
      header: () => "Car Model",
      cell: (info) => info.getValue(),
      footer: () => "Car Model",
    }),
    columnHelper.accessor("note", {
      header: () => "note",
      cell: (info) => info.getValue(),
      footer: () => "note",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex w-8/12 p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableHeader>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
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
