"use client"
import Image from "next/image";
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
import { useState, useEffect, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

// Mobile-friendly table component
// MobileTable component with pagination and selection highlighting
const MobileTable = ({
    data,
    columns,
    onItemClick,
    selectedItems = [] // Add this to track selected items
}: {
    data: any[],
    columns: any[],
    onItemClick?: (item: any) => void,
    selectedItems?: any[] // Array of selected items
}) => {
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get current page items
    const currentItems = data.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
    );

    // Check if an item is selected
    const isItemSelected = (item: any) => {
        // For products
        if (item.id) {
            return selectedItems.some(selected => selected.id === item.id);
        }
        // For customers
        if (item.Cfin_Code) {
            return selectedItems.some(selected => selected.Cfin_Code === item.Cfin_Code);
        }
        return false;
    };

    return (
        <div className="space-y-4">
            {currentItems.map((item, index) => (
                <Card
                    key={index}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${isItemSelected(item) ? 'border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                    onClick={() => onItemClick && onItemClick(item)}
                >
                    <CardContent className="p-4">
                        {columns.slice(0, 4).map((column, i) => {
                            // Skip the selection column
                            if (column.id === "select") return null;

                            const value = column.accessorKey ? item[column.accessorKey] :
                                column.accessorFn ? column.accessorFn(item) : '';

                            return (
                                <div key={i} className="flex justify-between py-1">
                                    <span className="font-medium text-sm">{column.header}</span>
                                    <span className="text-sm">{value}</span>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(prev => Math.max(0, prev - 1))}
                        disabled={page === 0}
                    >
                        Previous
                    </Button>

                    <span className="text-sm">
                        Page {page + 1} of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={page === totalPages - 1}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default function Home() {
    const [activeTab, setActiveTab] = useState("products");
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const [productData, setData] = useState<Products[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);
    useEffect(() => {
        async function fetchData() {
            const result = await getProducts();
            setData(result);
        }
        fetchData();
    }, []);

    // Handle selection changes - Memoized function to prevent re-renders
    const handleProductSelectionChange = useCallback((selectedRows: Products[]) => {
        setSelectedProducts(selectedRows);
    }, []);

    // Handle mobile product selection
    const handleMobileProductSelect = (product: Products) => {
        setSelectedProducts(prev => {
            // If already selected, remove it
            const isAlreadySelected = prev.some(p => p.id === product.id);
            if (isAlreadySelected) {
                return prev.filter(p => p.id !== product.id);
            }
            // Otherwise add it
            return [...prev, product];
        });
    };

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

    // Handle mobile customer selection
    const handleMobileCustomerSelect = (customer: Customers) => {
        setSelectedCustomers(prev => {
            // If already selected, remove it
            const isAlreadySelected = prev.some(c => c.Cfin_Code === customer.Cfin_Code);
            if (isAlreadySelected) {
                return prev.filter(c => c.Cfin_Code !== customer.Cfin_Code);
            }
            // Otherwise add it
            return [...prev, customer];
        });
    };

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
        <div className="container mx-auto px-4">
            <div className="py-4 flex justify-center md:justify-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full md:w-[500px] grid-cols-3 mb-4">
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="submit">Submit</TabsTrigger>
                </TabsList>

                {/* Selection Summary displayed regardless of tab */}
                <SelectionSummary
                    selectedProducts={selectedProducts}
                    selectedCustomers={selectedCustomers}
                />

                <TabsContent value="products" className="w-full">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Product Selection</CardTitle>
                            <CardDescription>
                                Choose one or more products and proceed to the next step.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 px-2 sm:px-6">
                            <div className="py-4">
                                {isMobile ? (
                                    <MobileTable
                                        data={productData}
                                        columns={product_columns}
                                        onItemClick={handleMobileProductSelect}
                                        selectedItems={selectedProducts} // Pass selected products
                                    />
                                ) : (
                                    <DataTable
                                        columns={product_columns}
                                        data={productData}
                                        onSelectionChange={handleProductSelectionChange}
                                    />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="px-4 sm:px-6">
                            <Button
                                onClick={() => setActiveTab("customer")}
                                disabled={selectedProducts.length === 0}
                                className="w-full sm:w-auto"
                            >
                                Next Page
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="customer" className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Selection</CardTitle>
                            <CardDescription>
                                Select one or more customers to proceed with the order.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 px-2 sm:px-6">
                            <div className="py-4">
                                {isMobile ? (
                                    <MobileTable
                                        data={customerData}
                                        columns={customer_columns}
                                        onItemClick={handleMobileCustomerSelect}
                                        selectedItems={selectedCustomers} // Pass selected customers
                                    />
                                ) : (
                                    <DataTable
                                        columns={customer_columns}
                                        data={customerData}
                                        onSelectionChange={handleCustomerSelectionChange}
                                    />
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="px-4 sm:px-6">
                            <Button
                                onClick={() => setActiveTab("submit")}
                                disabled={selectedCustomers.length === 0}
                                className="w-full sm:w-auto"
                            >
                                Proceed to Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="submit" className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>
                                Review your selections and submit your order
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-2 sm:px-6">
                            <div className="space-y-8">
                                {/* Order summary */}
                                <Card className="bg-gray-50 dark:bg-gray-800">
                                    <CardContent className="pt-6 px-2 sm:px-6">
                                        <h3 className="text-lg font-semibold mb-4">Order Details</h3>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="font-medium mb-2">Selected Products ({selectedProducts.length})</h4>
                                                <div className="overflow-x-auto">
                                                    {isMobile ? (
                                                        <div className="space-y-4">
                                                            {selectedProducts.map((product) => (
                                                                <Card key={product.id} className="p-3">
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <div className="font-medium">PO Number:</div>
                                                                        <div>{product.comment_po_no}</div>

                                                                        <div className="font-medium">Brand:</div>
                                                                        <div>{product.brand}</div>

                                                                        <div className="font-medium">Description:</div>
                                                                        <div>{product.item_description}</div>

                                                                        <div className="font-medium">Value (Rs):</div>
                                                                        <div>{product.value_rs.toFixed(2)}</div>
                                                                    </div>
                                                                </Card>
                                                            ))}
                                                            <Card className="p-3 bg-gray-100 dark:bg-gray-700">
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="font-bold">Total:</div>
                                                                    <div className="font-bold">
                                                                        {selectedProducts.reduce((sum, product) => sum + product.value_rs, 0).toFixed(2)}
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    ) : (
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
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-2">Selected Customers ({selectedCustomers.length})</h4>
                                                <div className="overflow-x-auto">
                                                    {isMobile ? (
                                                        <div className="space-y-4">
                                                            {selectedCustomers.map((customer) => (
                                                                <Card key={customer.Cfin_Code} className="p-3">
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <div className="font-medium">CFIN Code:</div>
                                                                        <div>{customer.Cfin_Code}</div>

                                                                        <div className="font-medium">Name:</div>
                                                                        <div>{customer.Name}</div>

                                                                        <div className="font-medium">Division:</div>
                                                                        <div>{customer.Division}</div>

                                                                        <div className="font-medium">City:</div>
                                                                        <div>{customer.City}</div>
                                                                    </div>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    ) : (
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
                                                    )}
                                                </div>
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
                                            <select id="priority" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400">
                                                <option value="normal">Normal</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 px-4 sm:px-6">
                            <Button
                                variant="outline"
                                onClick={() => setActiveTab("customer")}
                                className="w-full sm:w-auto"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={selectedProducts.length === 0 || selectedCustomers.length === 0}
                                className="w-full sm:w-auto"
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