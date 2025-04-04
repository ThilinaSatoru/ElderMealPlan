import { HealthProfile, health_profile_columns } from "./columns"
import { DataTable } from "./data-table"
import HealthProfilesTable from "./table";

async function loadHealthProfilesFromAPI(): Promise<HealthProfile[]> {
    const response = await fetch('http://localhost:3000/api/profiles', {
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiData = await response.json();

    return apiData.map((profile: any) => ({
        id: profile.id.toString(),
        userId: profile.id.toString(),
        ageGroup: getAgeGroup(profile.age),
        gender: profile.gender.toLowerCase(),
        weightRange: getWeightRange(profile.weight),
        heightRange: getHeightRange(profile.height),
        bmiCategory: getBmiCategory(profile.bmi),
        location: profile.location,
        diabetesDuration: profile.diagnosed_years_ago.toString(),
        medicationDuration: "",
        chronicDiseases: profile.other_conditions ? [profile.other_conditions] : [],
        fastingBloodSugar: profile.fasting_glucose.toString(),
        postprandialBloodSugar: profile.postprandial_glucose.toString(),
        hba1cLevel: profile.hba1c,
        dietaryPreferences: profile.diet_followed,
        allergies: profile.allergies ? [profile.allergies] : [],
        avoidanceFoods: profile.foods_avoided ? [profile.foods_avoided] : [],
        cookingMethods: profile.cooking_methods ? [profile.cooking_methods] : [],
    }));
}

// Helper functions to transform data
function getAgeGroup(age: number): string {
    if (age < 20) return "Under 20";
    if (age < 30) return "20-29";
    if (age < 40) return "30-39";
    if (age < 50) return "40-49";
    if (age < 60) return "50-59";
    return "60+";
}

function getWeightRange(weight: number): string {
    if (weight < 50) return "Under 50kg";
    if (weight < 60) return "50-59kg";
    if (weight < 70) return "60-69kg";
    if (weight < 80) return "70-79kg";
    if (weight < 90) return "80-89kg";
    return "90kg+";
}

function getHeightRange(height: number): string {
    if (height < 150) return "Under 150cm";
    if (height < 160) return "150-159cm";
    if (height < 170) return "160-169cm";
    if (height < 180) return "170-179cm";
    return "180cm+";
}

function getBmiCategory(bmi: number): string {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

export default async function ProfilesDataTable() {
    const data = await loadHealthProfilesFromAPI();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={health_profile_columns} data={data} />
        </div>
    )
}