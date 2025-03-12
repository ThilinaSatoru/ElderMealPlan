import { Products, product_columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Products[]> {
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

export default async function DemoPage() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={product_columns} data={data} />
        </div>
    )
}
