"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import ProductTable from "./dat"

// Sample data for E_Order_Form
const data: OrderForm[] = [
    {
        id: "1",
        comment_po_no: "PO-12345",
        brand: "BrandA",
        sub_brand: "Premium",
        product_group: "Food",
        nrv: 100,
        pack: 24,
        tto_tts: "TTO-001",
        material: "Plastic",
        customer_code: "CUST001",
        item_description: "Premium Food Product A",
        value_rs: 2500.50,
        strategic_group: "High Value"
    },
    {
        id: "2",
        comment_po_no: "PO-67890",
        brand: "BrandB",
        sub_brand: "Standard",
        product_group: "Beverage",
        nrv: 80,
        pack: 12,
        tto_tts: "TTS-002",
        material: "Glass",
        customer_code: "CUST002",
        item_description: "Standard Beverage Product B",
        value_rs: 1200.75,
        strategic_group: "Medium Value"
    },
    {
        id: "3",
        comment_po_no: "PO-54321",
        brand: "BrandC",
        sub_brand: "Economy",
        product_group: "Household",
        nrv: 50,
        pack: 36,
        tto_tts: "TTO-003",
        material: "Cardboard",
        customer_code: "CUST003",
        item_description: "Economy Household Product C",
        value_rs: 850.25,
        strategic_group: "Economy"
    },
]

export type OrderForm = {
    id: string
    comment_po_no: string
    brand: string
    sub_brand: string
    product_group: string
    nrv: number
    pack: number
    tto_tts: string
    material: string
    customer_code: string
    item_description: string
    value_rs: number
    strategic_group: string
}

export const columns: ColumnDef<OrderForm>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "comment_po_no",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PO Number
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "sub_brand",
        header: "Sub Brand",
    },
    {
        accessorKey: "product_group",
        header: "Product Group",
    },
    {
        accessorKey: "nrv",
        header: () => <div className="text-right">NRV</div>,
        cell: ({row}) => {
            return <div className="text-right font-medium">{row.getValue("nrv")}</div>
        },
    },
    {
        accessorKey: "pack",
        header: () => <div className="text-right">Pack</div>,
        cell: ({row}) => {
            return <div className="text-right font-medium">{row.getValue("pack")}</div>
        },
    },
    {
        accessorKey: "tto_tts",
        header: "TTO/TTS",
    },
    {
        accessorKey: "material",
        header: "Material",
    },
    {
        accessorKey: "customer_code",
        header: "Customer Code",
    },
    {
        accessorKey: "item_description",
        header: "Item Description",
    },
    {
        accessorKey: "value_rs",
        header: () => <div className="text-right">Value (Rs)</div>,
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("value_rs"))
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "strategic_group",
        header: "Strategic Group",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const order = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(order.id)}
                        >
                            Copy order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View order details</DropdownMenuItem>
                        <DropdownMenuItem>Edit order</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function EOrderFormTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
    })

    return (
        <div className="w-full">
            <ProductTable/>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by PO number..."
                    value={(table.getColumn("comment_po_no")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("comment_po_no")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
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
    )
}