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
import { useState, useEffect, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CardWithForm } from "./card-button";
import { DataTable } from "./orders/data-table";
import { Products, product_columns } from "./orders/columns";
import { Customers, customer_columns } from "./customer/columns"


async function getProducts(): Promise<Products[]> {
    return [
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
        ...Array.from({ length: 25 }, (_, i) => ({
            id: (i + 2).toString(),
            comment_po_no: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
            brand: `Brand${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
            sub_brand: ["Standard", "Premium", "Deluxe"][Math.floor(Math.random() * 3)],
            product_group: ["Food", "Beverage", "Household"][Math.floor(Math.random() * 3)],
            nrv: Math.floor(Math.random() * 500),
            pack: [12, 24, 36, 48][Math.floor(Math.random() * 4)],
            tto_tts: `TTO-${Math.floor(100 + Math.random() * 900)}`,
            material: ["Plastic", "Glass", "Metal", "Paper"][Math.floor(Math.random() * 4)],
            customer_code: `CUST${Math.floor(100 + Math.random() * 900)}`,
            item_description: `Product ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${i + 2}`,
            value_rs: parseFloat((Math.random() * 5000).toFixed(2)),
            strategic_group: ["High Value", "Mid Range", "Budget"][Math.floor(Math.random() * 3)]
        }))
    ];
}

export async function getCustomers(): Promise<Customers[]> {
    return [
        {
            Customer: 1,
            Name: "John Doe",
            City: "New York",
            Street: "123 Main St",
            Cfin_Code: "CFIN001",
            Division: "North America",
            Last_Name: "Doe",
            First_Name: "John",
            ASE_Name: "ASE-123"
        },
        ...Array.from({ length: 25 }, (_, i) => ({
            Customer: i + 2,
            Name: `Customer ${i + 2}`,
            City: ["Los Angeles", "Chicago", "Houston", "Miami"][Math.floor(Math.random() * 4)],
            Street: `${Math.floor(100 + Math.random() * 900)} Random St`,
            Cfin_Code: `CFIN${Math.floor(100 + Math.random() * 900)}`,
            Division: ["North America", "Europe", "Asia", "South America"][Math.floor(Math.random() * 4)],
            Last_Name: `LastName${i + 2}`,
            First_Name: `FirstName${i + 2}`,
            ASE_Name: `ASE-${Math.floor(100 + Math.random() * 900)}`
        }))
    ];
}


export default function Home() {
    const [activeTab, setActiveTab] = useState("products");

    const [productData, setData] = useState<Products[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
    useEffect(() => {
        async function fetchData() {
            const result = await getProducts();
            setData(result);
        }
        fetchData();
    }, []);
    // Handle selection changes Memoized function to prevent re-renders
    const handleProductSelectionChange = useCallback((selectedRows: Products[]) => {
        setSelectedProducts(selectedRows);
    }, []);



    const [customerData, setCustomerData] = useState<Customers[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<Customers[]>([]);
    useEffect(() => {
        async function fetchData() {
            const result = await getCustomers();
            setCustomerData(result);
        }
        fetchData();
    }, []);
    // Handle selection changes
    const handleCustomerSelectionChange = useCallback((selectedRows: Customers[]) => {
        setSelectedCustomers(selectedRows);
    }, []);


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
            <div className="flex gap-4 items-center flex-col sm:flex-row mb-10">
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-[500px] grid-cols-3">
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="submit">Submit</TabsTrigger>
                </TabsList>
                <TabsContent value="products" className="w-[1200px]">
                    <Card className="w-[1200px]">
                        <CardHeader>
                            <CardTitle>Product Selection</CardTitle>
                            <CardDescription>
                                Choose one or more products and proceed to the next step.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Card className="shadow-lg rounded-2xl">
                                <CardContent className="p-6">
                                    <div className="container mx-auto py-10">
                                        <DataTable
                                            columns={product_columns}
                                            data={productData}
                                            onSelectionChange={handleProductSelectionChange}
                                        />

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
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setActiveTab("customer")} disabled={selectedProducts.length === 0}>Next Page</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="customer" className="w-[1200px]">
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
                                    <div className="container mx-auto py-10">
                                        <DataTable
                                            columns={customer_columns}
                                            data={customerData}
                                            onSelectionChange={handleCustomerSelectionChange}
                                        />
                                        {selectedCustomers.length > 0 && (
                                            <div className="mt-6">
                                                <h2 className="text-xl font-semibold mb-2">Selected Customers:</h2>
                                                <ul className="list-disc pl-6">
                                                    {selectedCustomers.map((customer) => (
                                                        <li key={customer.Cfin_Code}>
                                                            {customer.Cfin_Code} - {customer.ASE_Name} ({customer.Division})
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setActiveTab("customer")} disabled={selectedCustomers.length === 0}>Proceed</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="submit" className="w-[1200px]">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Product Selection</CardTitle>
                            <CardDescription>
                                Choose one or more products and proceed to the next step.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CardWithForm />
                        </CardContent>

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
