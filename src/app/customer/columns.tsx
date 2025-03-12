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
export type Customers = {
    Customer: number;
    Name: string;
    City: string;
    Street: string;
    Cfin_Code: string;
    Division: string;
    Last_Name: string;
    First_Name: string;
    ASE_Name: string;
};

export const customer_columns: ColumnDef<Customers>[] = [
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
        accessorKey: "Customer",
        header: "Customer ID",
    },
    {
        accessorKey: "Name",
        header: "Name",
    },
    {
        accessorKey: "City",
        header: "City",
    },
    {
        accessorKey: "Street",
        header: "Street",
    },
    {
        accessorKey: "Cfin_Code",
        header: "Cfin Code",
    },
    {
        accessorKey: "Division",
        header: "Division",
    },
    {
        accessorKey: "Last_Name",
        header: "Last Name",
    },
    {
        accessorKey: "First_Name",
        header: "First Name",
    },
    {
        accessorKey: "ASE_Name",
        header: "ASE Name",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const customer = row.original

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
                            onClick={() => navigator.clipboard.writeText(String(customer.Customer))}
                        >
                            Copy Customer ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];
