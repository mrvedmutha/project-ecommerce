"use client";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ITableProps } from "@/types/ui/reuseableTableProps";
import { get } from "http";

const ReuseableTable = <T,>({
  data,
  columns,
  model,
  divClassName = "",
  captionLink = "",
  captionText = "",
}: ITableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className={divClassName}>
      <Table className="mt-5">
        {captionText && (
          <TableCaption className="text-left">
            {captionLink ? (
              <Link href={captionLink}>{captionText}</Link>
            ) : (
              captionText
            )}
          </TableCaption>
        )}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-center"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!captionText && (
        <div className="flex items-center justify-start space-x-2 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReuseableTable;
