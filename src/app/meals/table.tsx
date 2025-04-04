import { meal_plan_columns } from "./columns"
import { DataTable } from "./data-table"

async function fetchMealPlans() {
    try {
        const response = await fetch('http://127.0.0.1:5000/meal/', {
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching meal plans:", error);
        return [];
    }
}



export default async function ProfilesDataTable() {
    const data = await fetchMealPlans();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={meal_plan_columns} data={data} />
        </div>
    )
}


