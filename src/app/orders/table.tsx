"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
];

export default function ProductTable() {
    const router = useRouter();
    const [selectedProducts, setSelectedProducts] = useState<OrderForm[]>([]);

    const handleSelect = (product: OrderForm) => {
        setSelectedProducts((prev) => {
            const isSelected = prev.some((p) => p.id === product.id);
            return isSelected ? prev.filter((p) => p.id !== product.id) : [...prev, product];
        });
    };

    useEffect(() => {
        if (!router) return;
    }, [router]);


    const handleSubmit = () => {
        if (!router) return; // Prevent errors if router is undefined
        if (selectedProducts.length > 0) {
            router.push("/customer");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-3xl font-bold mb-4">Product Selection</h1>
            <p className="text-gray-600 mb-6">Choose one or more products and proceed to the next step.</p>
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
                                            onCheckedChange={() => handleSelect(product)}
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
                    <div className="mt-6">
                        <Button onClick={handleSubmit} disabled={selectedProducts.length === 0} className="w-full">
                            Proceed to Next Page
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}