"use client"
import {useState} from "react";
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
import {Input} from "@/components/ui/input";

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
];

export default function CustomerTable() {
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSelect = (customer: Customer) => {
        setSelectedCustomers((prev) => {
            const isSelected = prev.some((c) => c.Customer === customer.Customer);
            return isSelected ? prev.filter((c) => c.Customer !== customer.Customer) : [...prev, customer];
        });
    };

    const handleSubmit = () => {
        if (selectedCustomers.length > 0) {
            // @ts-ignore
            router.push({
                pathname: "/order-details",
                query: {customers: JSON.stringify(selectedCustomers)},
            });
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.ASE_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/orders">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Customers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-3xl font-bold mb-4">Customer Selection</h1>
            <p className="text-gray-600 mb-6">Select one or more customers to proceed with the order.</p>

            {/*<div className="mb-6">*/}
            {/*    <Input*/}
            {/*        placeholder="Search by name, city, or ASE name..."*/}
            {/*        value={searchTerm}*/}
            {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*        className="max-w-md"*/}
            {/*    />*/}
            {/*</div>*/}

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
                            {filteredCustomers.map((customer) => (
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
                                            onCheckedChange={() => handleSelect(customer)}
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
                    <div className="mt-6">
                        <Button onClick={handleSubmit} disabled={selectedCustomers.length === 0} className="w-full">
                            Proceed to Order Details
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}