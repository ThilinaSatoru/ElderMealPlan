import { HealthProfile, health_profile_columns } from "./columns"
import { DataTable } from "./data-table"
import HealthProfilesTable from "./table";
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { NextApiRequest, NextApiResponse } from 'next';


async function loadHealthProfilesFromCSV(): Promise<HealthProfile[]> {
    const filePath = path.join(process.cwd(), 'public', 'diabetes_users_details.csv');
    return new Promise((resolve, reject) => {
        const results: HealthProfile[] = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                results.push({
                    id: row['User ID'] || "", // Map to expected key
                    userId: row['User ID'] || "",
                    ageGroup: row['Age Group'] || "",
                    gender: row.Gender ? row.Gender.toLowerCase() : "", // Prevent undefined errors
                    weightRange: row['Weight range (kg)'] || "",
                    heightRange: row['Height range (cm)'] || "",
                    bmiCategory: row['BMI Category'] || "",
                    location: row['Current living : Urban/Rural'] || "",
                    diabetesDuration: row['Diabetes Duration'] || "",
                    medicationDuration: row['Medication Duration'] || "",
                    chronicDiseases: row['Other Chronic Diseases'] ? row['Other Chronic Diseases'].split(', ') : [],
                    fastingBloodSugar: row['Fasting Blood Sugar (mg/dL)'] || "",
                    postprandialBloodSugar: row['Postprandial Blood Sugar (mg/dL)'] || "",
                    hba1cLevel: row['HbA1c Level (%)'] || "",
                    dietaryPreferences: row['Dietary Preferences'] || "",
                    allergies: row.Allergies ? row.Allergies.split(', ') : [],
                    avoidanceFoods: row['Avoidance Foods'] ? row['Avoidance Foods'].split(', ') : [],
                    cookingMethods: row['Cooking Method'] ? row['Cooking Method'].split(', ') : [],
                });
            })
            // .on('data', (row) => {
            //     console.log("Parsed row:", row);
            // })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}


export default async function ProfilesDataTable() {
    const data = await loadHealthProfilesFromCSV();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={health_profile_columns} data={data} />
        </div>
    )
}