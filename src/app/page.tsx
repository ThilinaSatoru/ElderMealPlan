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

async function getCustomers(): Promise<Customers[]> {
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

// Selection summary component
const SelectionSummary = ({
    selectedProducts,
    selectedCustomers
}: {
    selectedProducts: Products[],
    selectedCustomers: Customers[]
}) => {
    // Return early if no selections exist
    if (selectedProducts.length === 0 && selectedCustomers.length === 0) {
        return null;
    }

    return (
        <Card className="shadow-md mb-6">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Selected Items</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                    {selectedProducts.length > 0 && (
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-2">Products ({selectedProducts.length})</h3>
                            <div className="max-h-32 overflow-y-auto">
                                <ul className="text-sm">
                                    {selectedProducts.map((product) => (
                                        <li key={product.id} className="mb-1 pb-1 border-b border-gray-100">
                                            <span className="font-medium">{product.comment_po_no}</span> - {product.item_description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {selectedCustomers.length > 0 && (
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-2">Customers ({selectedCustomers.length})</h3>
                            <div className="max-h-32 overflow-y-auto">
                                <ul className="text-sm">
                                    {selectedCustomers.map((customer) => (
                                        <li key={customer.Cfin_Code} className="mb-1 pb-1 border-b border-gray-100">
                                            <span className="font-medium">{customer.Cfin_Code}</span> - {customer.Name} ({customer.Division})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

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

    // Function to handle form submission
    const handleSubmit = () => {
        // Here you would handle sending the data to your backend
        console.log("Submitting order with:", {
            products: selectedProducts,
            customers: selectedCustomers
        });

        // Add your submission logic here
        alert(`Order submitted with ${selectedProducts.length} products for ${selectedCustomers.length} customers`);
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
            <div className="flex gap-4 items-center flex-col sm:flex-row mb-10">
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-[500px] grid-cols-3">
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="submit">Submit</TabsTrigger>
                </TabsList>

                {/* Selection Summary displayed regardless of tab */}
                <SelectionSummary
                    selectedProducts={selectedProducts}
                    selectedCustomers={selectedCustomers}
                />

                <TabsContent value="products" className="w-full max-w-[1200px]">
                    <Card className="w-full">
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
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setActiveTab("customer")} disabled={selectedProducts.length === 0}>Next Page</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="customer" className="w-full max-w-[1200px]">
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
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setActiveTab("submit")} disabled={selectedCustomers.length === 0}>Proceed to Submit</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="submit" className="w-full max-w-[1200px]">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>
                                Review your selections and submit your order
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {/* Order summary */}
                                <Card className="bg-gray-50 dark:bg-gray-800">
                                    <CardContent className="pt-6">
                                        <h3 className="text-lg font-semibold mb-4">Order Details</h3>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-medium mb-2">Selected Products ({selectedProducts.length})</h4>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>PO Number</TableHead>
                                                            <TableHead>Brand</TableHead>
                                                            <TableHead>Description</TableHead>
                                                            <TableHead className="text-right">Value (Rs)</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {selectedProducts.map((product) => (
                                                            <TableRow key={product.id}>
                                                                <TableCell>{product.comment_po_no}</TableCell>
                                                                <TableCell>{product.brand}</TableCell>
                                                                <TableCell>{product.item_description}</TableCell>
                                                                <TableCell className="text-right">{product.value_rs.toFixed(2)}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                        <TableRow>
                                                            <TableCell colSpan={3} className="text-right font-bold">Total:</TableCell>
                                                            <TableCell className="text-right font-bold">
                                                                {selectedProducts.reduce((sum, product) => sum + product.value_rs, 0).toFixed(2)}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-2">Selected Customers ({selectedCustomers.length})</h4>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>CFIN Code</TableHead>
                                                            <TableHead>Name</TableHead>
                                                            <TableHead>Division</TableHead>
                                                            <TableHead>City</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {selectedCustomers.map((customer) => (
                                                            <TableRow key={customer.Cfin_Code}>
                                                                <TableCell>{customer.Cfin_Code}</TableCell>
                                                                <TableCell>{customer.Name}</TableCell>
                                                                <TableCell>{customer.Division}</TableCell>
                                                                <TableCell>{customer.City}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Additional Order Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="orderDate">Order Date</Label>
                                            <Input type="date" id="orderDate" defaultValue={new Date().toISOString().split('T')[0]} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="requestedBy">Requested By</Label>
                                            <Input type="text" id="requestedBy" placeholder="Your name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="specialInstructions">Special Instructions</Label>
                                            <Input type="text" id="specialInstructions" placeholder="Any special requirements" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="priority">Priority</Label>
                                            <select id="priority" className="w-full p-2 border rounded">
                                                <option value="normal">Normal</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setActiveTab("customer")}>Back</Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={selectedProducts.length === 0 || selectedCustomers.length === 0}
                            >
                                Submit Order
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}