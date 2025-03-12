"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    OnChangeFn,
    RowSelectionState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "./table-pagination"
import { useEffect } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onSelectionChange?: (selectedRows: TData[]) => void
    onLastPageReached?: () => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onSelectionChange,
    onLastPageReached,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    // When selection changes, call the provided onSelectionChange callback
    useEffect(() => {
        if (onSelectionChange) {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original as TData)
            onSelectionChange(selectedRows)
        }
    }, [table.getState().rowSelection, onSelectionChange, table])

    // Check if current page is the last page
    const currentPageIndex = table.getState().pagination.pageIndex
    const lastPageIndex = table.getPageCount() - 1

    // Update parent component when last page status changes
    useEffect(() => {
        if (currentPageIndex === lastPageIndex && lastPageIndex >= 0 && onLastPageReached) {
            onLastPageReached()
        }
    }, [currentPageIndex, lastPageIndex, onLastPageReached])

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination
                    table={table}
                    onLastPage={() => {
                        // Only needed if you want additional handling in the pagination component
                        // console.log("Reached last page in pagination component")
                    }}
                />
            </div>
        </div>
    )
}