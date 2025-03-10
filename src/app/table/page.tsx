"use client"
import Image from "next/image";
import { useState } from "react";
import { Table, Input, Button, Pagination, Tag, Tooltip } from "antd";
import { Search } from "lucide-react";

enum ServiceType {
    SALVAGE = "Salvage",
    S_R = "S&R",
    HIRE = "Hire",
    VD = "VD",
}

interface ClientData {
    key: number;
    client: string;
    caseRef: string;
    openedAt: string;
    doa: string;
    source: string;
    serviceProvider: string;
    services: ServiceType[];
    caseValue: string;
    description: string;
    comments: string;
}

const data: ClientData[] = Array.from({ length: 50 }, (_, i) => ({
    key: i,
    client: `Client ${i + 1}`,
    caseRef: `CC/${80564 + i}`,
    openedAt: `22/10/2022`,
    doa: `22/10/2022`,
    source: ["Google", "LinkedIn", "Facebook"][i % 3],
    serviceProvider: "CC/DGM",
    services: Object.values(ServiceType).slice(0, (i % 4) + 1),
    caseValue: `$${230 + i}.00`,
    description: `Detailed description for Client ${i + 1}`,
    comments: `Notes about case ${i + 1}`,
}));

export default function TableData() {
    const [search, setSearch] = useState<string>("");
    const [filteredData, setFilteredData] = useState<ClientData[]>(data);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 8;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        setFilteredData(
            data.filter((item) =>
                item.client.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const columns = [
        { title: "Client", dataIndex: "client", key: "client" },
        { title: "Case Ref", dataIndex: "caseRef", key: "caseRef" },
        { title: "Opened At", dataIndex: "openedAt", key: "openedAt" },
        { title: "DOA", dataIndex: "doa", key: "doa" },
        { title: "Source", dataIndex: "source", key: "source" },
        { title: "Service Provider", dataIndex: "serviceProvider", key: "serviceProvider" },
        { title: "Case Value", dataIndex: "caseValue", key: "caseValue" },
        {
            title: "Services",
            dataIndex: "services",
            key: "services",
            render: (services: ServiceType[]) => (
                <>
                    {services.map((service) => (
                        <Tag color="blue" key={service}>{service}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text: string) => (
                <Tooltip title={text}>
                    <span className="truncate block max-w-[150px]">{text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Comments",
            dataIndex: "comments",
            key: "comments",
            render: (text: string) => (
                <Tooltip title={text}>
                    <span className="truncate block max-w-[150px]">{text}</span>
                </Tooltip>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <Input
                    prefix={<Search size={16} />}
                    placeholder="Search Clients"
                    value={search}
                    onChange={handleSearch}
                    className="w-1/3"
                />
                <Button type="primary">+ Add New</Button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                rowKey="key"
            />
            <div className="flex justify-end mt-4">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredData.length}
                    onChange={(page: number) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
