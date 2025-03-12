"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
export type Products = {
    id: string;
    comment_po_no: string;
    brand: string;
    sub_brand: string;
    product_group: string;
    nrv: number;
    pack: number;
    tto_tts: string;
    material: string;
    customer_code: string;
    item_description: string;
    value_rs: number;
    strategic_group: string;
};

export const product_columns: ColumnDef<Products>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
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
        header: "PO Number",
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
        accessorKey: "material",
        header: "Material",
    },
    {
        accessorKey: "item_description",
        header: "Description",
    },
    {
        accessorKey: "customer_code",
        header: "Customer Code",
    },
    {
        accessorKey: "strategic_group",
        header: "Strategic Group",
    },
    {
        accessorKey: "tto_tts",
        header: "TTO/TTS",
    },
    {
        accessorKey: "nrv",
        header: () => <div className="text-right">NRV</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("nrv"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "pack",
        header: "Pack",
    },
    {
        accessorKey: "value_rs",
        header: () => <div className="text-right">Value (Rs)</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("value_rs"))
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const orderForm = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(orderForm.id)}
                        >
                            Copy order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer details</DropdownMenuItem>
                        <DropdownMenuItem>View order details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]