"use client"
import Image from "next/image";
import FooterMain from "./footer"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CustomerTable from "@/app/customer/table";
import * as React from "react";
import ProductTable from "@/app/orders/table";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";



export type OrderForm = {
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
const products: OrderForm[] = [
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
        value_rs: 2500.5,
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
    {
        id: "4",
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
        value_rs: 2500.5,
        strategic_group: "High Value"
    },
    {
        id: "5",
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
        id: "6",
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
    {
        id: "7",
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
        value_rs: 2500.5,
        strategic_group: "High Value"
    },
    {
        id: "8",
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
        id: "9",
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
];

export type Customer = {
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
const customers: Customer[] = [
    {
        Customer: 1001,
        Name: "ABC Enterprises",
        City: "Mumbai",
        Street: "24 Commercial Avenue, Andheri East",
        Cfin_Code: "CFN-1001",
        Division: "North",
        Last_Name: "Patel",
        First_Name: "Raj",
        ASE_Name: "Amit Kumar"
    },
    {
        Customer: 1002,
        Name: "XYZ Industries",
        City: "Delhi",
        Street: "15 Industrial Area, Phase 2",
        Cfin_Code: "CFN-1002",
        Division: "Central",
        Last_Name: "Singh",
        First_Name: "Harpreet",
        ASE_Name: "Priya Sharma"
    },
    {
        Customer: 1003,
        Name: "Global Trading Co.",
        City: "Bangalore",
        Street: "42 Tech Park, Whitefield",
        Cfin_Code: "CFN-1003",
        Division: "South",
        Last_Name: "Reddy",
        First_Name: "Kiran",
        ASE_Name: "Rahul Verma"
    },
    {
        Customer: 1004,
        Name: "ABC Enterprises",
        City: "Mumbai",
        Street: "24 Commercial Avenue, Andheri East",
        Cfin_Code: "CFN-1001",
        Division: "North",
        Last_Name: "Patel",
        First_Name: "Raj",
        ASE_Name: "Amit Kumar"
    },
    {
        Customer: 1005,
        Name: "XYZ Industries",
        City: "Delhi",
        Street: "15 Industrial Area, Phase 2",
        Cfin_Code: "CFN-1002",
        Division: "Central",
        Last_Name: "Singh",
        First_Name: "Harpreet",
        ASE_Name: "Priya Sharma"
    },
    {
        Customer: 1006,
        Name: "Global Trading Co.",
        City: "Bangalore",
        Street: "42 Tech Park, Whitefield",
        Cfin_Code: "CFN-1003",
        Division: "South",
        Last_Name: "Reddy",
        First_Name: "Kiran",
        ASE_Name: "Rahul Verma"
    },
    {
        Customer: 1007,
        Name: "ABC Enterprises",
        City: "Mumbai",
        Street: "24 Commercial Avenue, Andheri East",
        Cfin_Code: "CFN-1001",
        Division: "North",
        Last_Name: "Patel",
        First_Name: "Raj",
        ASE_Name: "Amit Kumar"
    },
    {
        Customer: 1008,
        Name: "XYZ Industries",
        City: "Delhi",
        Street: "15 Industrial Area, Phase 2",
        Cfin_Code: "CFN-1002",
        Division: "Central",
        Last_Name: "Singh",
        First_Name: "Harpreet",
        ASE_Name: "Priya Sharma"
    },
    {
        Customer: 1009,
        Name: "Global Trading Co.",
        City: "Bangalore",
        Street: "42 Tech Park, Whitefield",
        Cfin_Code: "CFN-1003",
        Division: "South",
        Last_Name: "Reddy",
        First_Name: "Kiran",
        ASE_Name: "Rahul Verma"
    },
];


export default function Home() {
    const [activeTab, setActiveTab] = useState("products");

    const [selectedProducts, setSelectedProducts] = useState<OrderForm[]>([]);
    const handleSelect_1 = (product: OrderForm) => {
        setSelectedProducts((prev) => {
            const isSelected = prev.some((p) => p.id === product.id);
            return isSelected ? prev.filter((p) => p.id !== product.id) : [...prev, product];
        });
    };

    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const handleSelect_2 = (customer: Customer) => {
        setSelectedCustomers((prev) => {
            const isSelected = prev.some((c) => c.Customer === customer.Customer);
            return isSelected ? prev.filter((c) => c.Customer !== customer.Customer) : [...prev, customer];
        });
    };

    return (
        <div>
            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">

            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row mb-2">

            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                </TabsList>
                <TabsContent value="products">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Selection</CardTitle>
                            <CardDescription>
                                Choose one or more products and proceed to the next step.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Card className="shadow-lg rounded-2xl">
                                <CardContent className="p-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>PO Number</TableHead>
                                                <TableHead>Brand</TableHead>
                                                <TableHead>Sub Brand</TableHead>
                                                <TableHead>Product Group</TableHead>
                                                <TableHead>NRV</TableHead>
                                                <TableHead>Pack</TableHead>
                                                <TableHead>Material</TableHead>
                                                <TableHead>Item Description</TableHead>
                                                <TableHead>Value (Rs)</TableHead>
                                                <TableHead>Select</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.id}>
                                                    <TableCell>{product.comment_po_no}</TableCell>
                                                    <TableCell>{product.brand}</TableCell>
                                                    <TableCell>{product.sub_brand}</TableCell>
                                                    <TableCell>{product.product_group}</TableCell>
                                                    <TableCell>{product.nrv}</TableCell>
                                                    <TableCell>{product.pack}</TableCell>
                                                    <TableCell>{product.material}</TableCell>
                                                    <TableCell>{product.item_description}</TableCell>
                                                    <TableCell>{product.value_rs}</TableCell>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedProducts.some((p) => p.id === product.id)}
                                                            onCheckedChange={() => handleSelect_1(product)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {selectedProducts.length > 0 && (
                                        <div className="mt-6">
                                            <h2 className="text-xl font-semibold mb-2">Selected Products:</h2>
                                            <ul className="list-disc pl-6">
                                                {selectedProducts.map((product) => (
                                                    <li key={product.id}>{product.comment_po_no} - {product.item_description}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setActiveTab("customer")} disabled={selectedProducts.length === 0}>Next Page</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="customer">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Selection</CardTitle>
                            <CardDescription>
                                Select one or more customers to proceed with the order.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Card className="shadow-lg rounded-2xl">
                                <CardContent className="p-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Customer ID</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>City</TableHead>
                                                <TableHead>Street</TableHead>
                                                <TableHead>Cfin Code</TableHead>
                                                <TableHead>Division</TableHead>
                                                <TableHead>Contact Person</TableHead>
                                                <TableHead>ASE Name</TableHead>
                                                <TableHead>Select</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {customers.map((customer) => (
                                                <TableRow key={customer.Customer}>
                                                    <TableCell>{customer.Customer}</TableCell>
                                                    <TableCell>{customer.Name}</TableCell>
                                                    <TableCell>{customer.City}</TableCell>
                                                    <TableCell>{customer.Street}</TableCell>
                                                    <TableCell>{customer.Cfin_Code}</TableCell>
                                                    <TableCell>{customer.Division}</TableCell>
                                                    <TableCell>{customer.First_Name} {customer.Last_Name}</TableCell>
                                                    <TableCell>{customer.ASE_Name}</TableCell>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedCustomers.some((c) => c.Customer === customer.Customer)}
                                                            onCheckedChange={() => handleSelect_2(customer)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    {selectedCustomers.length > 0 && (
                                        <div className="mt-6">
                                            <h2 className="text-xl font-semibold mb-2">Selected Customers:</h2>
                                            <ul className="list-disc pl-6">
                                                {selectedCustomers.map((customer) => (
                                                    <li key={customer.Customer}>{customer.Customer} - {customer.Name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setActiveTab("customer")} disabled={selectedCustomers.length === 0}>Proceed</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
