// app/meal-recommendations/page.tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { HealthProfile } from "../profiles/columns";

// Type definition for meal recommendation
type MealRecommendation = {
    mealId: string;
    mealDetails: string;
    mealType: string;
    glycemicIndex: number;
    calories: number;
    carbohydrates: number;
    protein: number;
    fats: number;
    fiber: number;
    culturalSuitability: string;
    allergenInformation: string;
    cookingMethod: string;
    dietaryPreference: string;
};

// Form schema validation
const formSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    ageGroup: z.string().min(1, "Age group is required"),
    gender: z.string().min(1, "Gender is required"),
    weightRange: z.string().min(1, "Weight range is required"),
    heightRange: z.string().min(1, "Height range is required"),
    bmiCategory: z.string().min(1, "BMI category is required"),
    location: z.string().min(1, "Location is required"),
    diabetesDuration: z.string().min(1, "Diabetes duration is required"),
    medicationDuration: z.string().min(1, "Medication duration is required"),
    chronicDiseases: z.array(z.string()),
    fastingBloodSugar: z.string().min(1, "Fasting blood sugar is required"),
    postprandialBloodSugar: z.string().min(1, "Postprandial blood sugar is required"),
    hba1cLevel: z.string().min(1, "HbA1c level is required"),
    dietaryPreferences: z.string().min(1, "Dietary preferences is required"),
    allergies: z.array(z.string()),
    avoidanceFoods: z.array(z.string()),
    cookingMethods: z.array(z.string()),
});

// Sample chronic diseases options
const chronicDiseaseOptions = [
    { id: "hypertension", label: "Hypertension" },
    { id: "heartDisease", label: "Heart Disease" },
    { id: "kidneyDisease", label: "Kidney Disease" },
    { id: "thyroidDisorder", label: "Thyroid Disorder" },
];

// Sample allergy options
const allergyOptions = [
    { id: "nuts", label: "Nuts" },
    { id: "dairy", label: "Dairy" },
    { id: "gluten", label: "Gluten" },
    { id: "shellfish", label: "Shellfish" },
    { id: "eggs", label: "Eggs" },
];

// Sample foods to avoid options
const avoidanceFoodOptions = [
    { id: "redMeat", label: "Red Meat" },
    { id: "processedFood", label: "Processed Food" },
    { id: "refinedSugar", label: "Refined Sugar" },
    { id: "friedFood", label: "Fried Food" },
];

// Sample cooking method options
const cookingMethodOptions = [
    { id: "boiling", label: "Boiling" },
    { id: "steaming", label: "Steaming" },
    { id: "baking", label: "Baking" },
    { id: "grilling", label: "Grilling" },
];

export default function HealthProfilePage() {
    const [mealRecommendations, setMealRecommendations] = useState<MealRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userId: "",
            ageGroup: "",
            gender: "",
            weightRange: "",
            heightRange: "",
            bmiCategory: "",
            location: "",
            diabetesDuration: "",
            medicationDuration: "",
            chronicDiseases: [],
            fastingBloodSugar: "",
            postprandialBloodSugar: "",
            hba1cLevel: "",
            dietaryPreferences: "",
            allergies: [],
            avoidanceFoods: [],
            cookingMethods: [],
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        // Create a health profile from form values
        const healthProfile: HealthProfile = {
            id: uuidv4(),
            ...values,
        };

        // Simulate API call with a timeout
        setTimeout(() => {
            // Mock meal recommendations based on health profile
            const recommendations = generateMealRecommendations(healthProfile);
            setMealRecommendations(recommendations);
            setIsLoading(false);
        }, 1500);
    }

    // Mock function to generate meal recommendations based on health profile
    function generateMealRecommendations(profile: HealthProfile): MealRecommendation[] {
        // In a real application, this would call an API or use a more sophisticated algorithm
        // For this example, we'll return mock data

        // Sample meals for different dietary preferences
        const mealsByPreference: Record<string, MealRecommendation[]> = {
            "vegetarian": [
                {
                    mealId: "M002",
                    mealDetails: "Red Raw Rice (1 cup), Dhal Curry (2 tbsp), Spinach Curry (2 tbsp), Tofu Stir Fry (1/2 cup), Orange (1 medium)",
                    mealType: "Lunch",
                    glycemicIndex: 45,
                    calories: 320,
                    carbohydrates: 48,
                    protein: 15,
                    fats: 6,
                    fiber: 8,
                    culturalSuitability: "Yes",
                    allergenInformation: "Soy",
                    cookingMethod: "Boiling, Stir Frying",
                    dietaryPreference: "Vegetarian",
                },
            ],
            "vegan": [
                {
                    mealId: "M003",
                    mealDetails: "Brown Rice (1 cup), Chickpea Curry (1/2 cup), Pumpkin Curry (2 tbsp), Green Salad (1 cup), Apple (1 small)",
                    mealType: "Dinner",
                    glycemicIndex: 42,
                    calories: 310,
                    carbohydrates: 52,
                    protein: 12,
                    fats: 5,
                    fiber: 10,
                    culturalSuitability: "Yes",
                    allergenInformation: "None",
                    cookingMethod: "Boiling, Raw",
                    dietaryPreference: "Vegan",
                },
            ],
            "pescetarian": [
                {
                    mealId: "M001",
                    mealDetails: "Red Raw Rice (1 cup), Dhal Curry (2 tbsp), Steamed Fish (1 piece), Bitter Gourd Curry (2 tbsp), Banana (1 small)",
                    mealType: "Lunch",
                    glycemicIndex: 50,
                    calories: 340,
                    carbohydrates: 44,
                    protein: 19,
                    fats: 8,
                    fiber: 6,
                    culturalSuitability: "Yes",
                    allergenInformation: "Fish, Coconut milk",
                    cookingMethod: "Boiling, Steaming",
                    dietaryPreference: "Pescetarian",
                },
            ],
            "non-vegetarian": [
                {
                    mealId: "M004",
                    mealDetails: "Red Rice (1 cup), Chicken Curry (1 piece), Cucumber Salad (1/2 cup), Gotukola Sambol (2 tbsp), Papaya (1 slice)",
                    mealType: "Dinner",
                    glycemicIndex: 48,
                    calories: 380,
                    carbohydrates: 42,
                    protein: 22,
                    fats: 10,
                    fiber: 7,
                    culturalSuitability: "Yes",
                    allergenInformation: "Chicken, Coconut",
                    cookingMethod: "Boiling, Sautéing",
                    dietaryPreference: "Non-vegetarian",
                },
            ]
        };

        // Default to non-vegetarian if preference not found
        const preferredMeals = mealsByPreference[profile.dietaryPreferences.toLowerCase()] ||
            mealsByPreference["non-vegetarian"];

        // Filter meals based on allergies
        const filteredMeals = preferredMeals.filter(meal => {
            // Simple string matching for allergens - in real app would be more sophisticated
            return !profile.allergies.some(allergy =>
                meal.allergenInformation.toLowerCase().includes(allergy.toLowerCase())
            );
        });

        return filteredMeals.length > 0 ? filteredMeals : [
            {
                mealId: "M005",
                mealDetails: "Kurakkan Roti (2), Green Gram Curry (2 tbsp), Salad (1 cup), Papaya (1 small)",
                mealType: "Breakfast",
                glycemicIndex: 40,
                calories: 280,
                carbohydrates: 38,
                protein: 10,
                fats: 6,
                fiber: 8,
                culturalSuitability: "Yes",
                allergenInformation: "None",
                cookingMethod: "Grilling, Boiling",
                dietaryPreference: "Any",
            }
        ];
    }

    function getMealColor(mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack') {
        const colors = {
            'Breakfast': '#f59e0b',
            'Lunch': '#10b981',
            'Dinner': '#8b5cf6',
            'Snack': '#3b82f6'
        };
        return colors[mealType] || '#6b7280';
    }

    function getMealIcon(mealType: string) {
        switch (mealType) {
            case 'Breakfast':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                );
            case 'Lunch':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'Dinner':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                );
            case 'Snack':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                );
        }
    }

    function getNutritionColor(meal: MealRecommendation) {
        // Calculate protein percentage
        const totalNutrients = meal.carbohydrates + meal.protein + meal.fats;
        const proteinPercentage = (meal.protein / totalNutrients) * 100;

        // Color based on protein percentage
        if (proteinPercentage >= 30) {
            return '#10b981'; // green for high protein
        } else if (proteinPercentage >= 20) {
            return '#3b82f6'; // blue for medium protein
        } else {
            return '#f59e0b'; // amber for lower protein
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold">Generate Healthy Meal Plan</h1>
            <p className="text-gray-500">Enter your health information to receive personalized meal recommendations</p>
            <div className="container mx-auto py-10">

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Health Profile Form</CardTitle>
                        <CardDescription>
                            Enter your health information to receive personalized meal recommendations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Basic Information */}
                                    <FormField
                                        control={form.control}
                                        name="userId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>User ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter user ID" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="ageGroup"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Age Group</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select age group" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="18-30">18-30 years</SelectItem>
                                                        <SelectItem value="31-45">31-45 years</SelectItem>
                                                        <SelectItem value="46-60">46-60 years</SelectItem>
                                                        <SelectItem value="60+">Above 60 years</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="weightRange"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Weight Range</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select weight range" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="under50kg">Under 50 kg</SelectItem>
                                                        <SelectItem value="50-70kg">50-70 kg</SelectItem>
                                                        <SelectItem value="71-90kg">71-90 kg</SelectItem>
                                                        <SelectItem value="over90kg">Over 90 kg</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="heightRange"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Height Range</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select height range" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="under150cm">Under 150 cm</SelectItem>
                                                        <SelectItem value="150-165cm">150-165 cm</SelectItem>
                                                        <SelectItem value="166-180cm">166-180 cm</SelectItem>
                                                        <SelectItem value="over180cm">Over 180 cm</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bmiCategory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>BMI Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select BMI category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="underweight">Underweight</SelectItem>
                                                        <SelectItem value="normal">Normal</SelectItem>
                                                        <SelectItem value="overweight">Overweight</SelectItem>
                                                        <SelectItem value="obese">Obese</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select location" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="colombo">Colombo</SelectItem>
                                                        <SelectItem value="galle">Galle</SelectItem>
                                                        <SelectItem value="kandy">Kandy</SelectItem>
                                                        <SelectItem value="jaffna">Jaffna</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Medical Information */}
                                    <FormField
                                        control={form.control}
                                        name="diabetesDuration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Diabetes Duration</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select diabetes duration" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="less1year">Less than 1 year</SelectItem>
                                                        <SelectItem value="1-5years">1-5 years</SelectItem>
                                                        <SelectItem value="6-10years">6-10 years</SelectItem>
                                                        <SelectItem value="over10years">Over 10 years</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="medicationDuration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Medication Duration</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select medication duration" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="less1year">Less than 1 year</SelectItem>
                                                        <SelectItem value="1-5years">1-5 years</SelectItem>
                                                        <SelectItem value="6-10years">6-10 years</SelectItem>
                                                        <SelectItem value="over10years">Over 10 years</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fastingBloodSugar"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fasting Blood Sugar</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select fasting blood sugar range" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="under100">Under 100 mg/dL</SelectItem>
                                                        <SelectItem value="100-125">100-125 mg/dL</SelectItem>
                                                        <SelectItem value="126-150">126-150 mg/dL</SelectItem>
                                                        <SelectItem value="151-200">151-200 mg/dL</SelectItem>
                                                        <SelectItem value="over200">Over 200 mg/dL</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="postprandialBloodSugar"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Postprandial Blood Sugar</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select postprandial blood sugar range" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="under140">Under 140 mg/dL</SelectItem>
                                                        <SelectItem value="140-180">140-180 mg/dL</SelectItem>
                                                        <SelectItem value="181-220">181-220 mg/dL</SelectItem>
                                                        <SelectItem value="over220">Over 220 mg/dL</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hba1cLevel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>HbA1c Level</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select HbA1c level" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="under5.7">Under 5.7%</SelectItem>
                                                        <SelectItem value="5.7-6.4">5.7-6.4%</SelectItem>
                                                        <SelectItem value="6.5-7.0">6.5-7.0%</SelectItem>
                                                        <SelectItem value="7.1-8.0">7.1-8.0%</SelectItem>
                                                        <SelectItem value="over8.0">Over 8.0%</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="dietaryPreferences"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Dietary Preferences</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select dietary preference" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                                        <SelectItem value="vegan">Vegan</SelectItem>
                                                        <SelectItem value="pescetarian">Pescetarian</SelectItem>
                                                        <SelectItem value="non-vegetarian">Non-vegetarian</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Checkboxes for multiple selection fields */}
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="chronicDiseases"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-4">
                                                    <FormLabel className="text-base">Chronic Diseases</FormLabel>
                                                    <FormDescription>
                                                        Select all chronic diseases that apply.
                                                    </FormDescription>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                    {chronicDiseaseOptions.map((option) => (
                                                        <FormField
                                                            key={option.id}
                                                            control={form.control}
                                                            name="chronicDiseases"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={option.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(option.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, option.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== option.id
                                                                                            )
                                                                                        );
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {option.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="allergies"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-4">
                                                    <FormLabel className="text-base">Allergies</FormLabel>
                                                    <FormDescription>
                                                        Select all allergies that apply.
                                                    </FormDescription>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                    {allergyOptions.map((option) => (
                                                        <FormField
                                                            key={option.id}
                                                            control={form.control}
                                                            name="allergies"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={option.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(option.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, option.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== option.id
                                                                                            )
                                                                                        );
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {option.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="avoidanceFoods"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-4">
                                                    <FormLabel className="text-base">Foods to Avoid</FormLabel>
                                                    <FormDescription>
                                                        Select all foods you want to avoid.
                                                    </FormDescription>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                    {avoidanceFoodOptions.map((option) => (
                                                        <FormField
                                                            key={option.id}
                                                            control={form.control}
                                                            name="avoidanceFoods"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={option.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(option.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, option.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== option.id
                                                                                            )
                                                                                        );
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {option.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="cookingMethods"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-4">
                                                    <FormLabel className="text-base">Cooking Methods</FormLabel>
                                                    <FormDescription>
                                                        Select your preferred cooking methods.
                                                    </FormDescription>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                    {cookingMethodOptions.map((option) => (
                                                        <FormField
                                                            key={option.id}
                                                            control={form.control}
                                                            name="cookingMethods"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={option.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(option.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, option.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== option.id
                                                                                            )
                                                                                        );
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {option.label}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Processing..." : "Generate Meal Recommendations"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {mealRecommendations.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-center text-primary">Your Personalized Meal Plan</h2>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-blue-600">{mealRecommendations.length}</div>
                                        <p className="text-blue-700 mt-2">Recommended Meals</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-green-600">
                                            {Math.round(mealRecommendations.reduce((sum, meal) => sum + meal.calories, 0) / mealRecommendations.length)}
                                        </div>
                                        <p className="text-green-700 mt-2">Avg. Calories</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-purple-600">
                                            {Math.round(mealRecommendations.reduce((sum, meal) => sum + meal.glycemicIndex, 0) / mealRecommendations.length)}
                                        </div>
                                        <p className="text-purple-700 mt-2">Avg. Glycemic Index</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-amber-600">
                                            {Math.round(mealRecommendations.reduce((sum, meal) => sum + meal.protein, 0))}g
                                        </div>
                                        <p className="text-amber-700 mt-2">Total Protein</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Meal Cards */}
                        <div className="space-y-4">
                            {mealRecommendations.map((meal) => (
                                <Card key={meal.mealId} className="overflow-hidden border-l-4 hover:shadow-lg transition-shadow duration-300"
                                    style={{ borderLeftColor: getMealColor(meal.mealType as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack') }}>
                                    <CardHeader className="bg-gray-50 pb-2">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle className="text-xl flex items-center">
                                                    {getMealIcon(meal.mealType)}
                                                    <span className="ml-2">{meal.mealType}</span>
                                                </CardTitle>
                                                <CardDescription>
                                                    {meal.dietaryPreference} • GI: {meal.glycemicIndex} • {meal.calories} kcal
                                                </CardDescription>
                                            </div>
                                            <div className="bg-white rounded-full p-2 shadow-sm">
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: getNutritionColor(meal) }}>
                                                    <span className="text-white font-bold text-sm">
                                                        {Math.round((meal.protein / (meal.carbohydrates + meal.protein + meal.fats)) * 100)}%
                                                    </span>
                                                </div>
                                                <span className="text-xs text-center block mt-1">Protein</span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pt-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="md:col-span-1">
                                                <h4 className="font-medium text-gray-700 mb-2">Meal Details</h4>
                                                <p className="text-gray-600">{meal.mealDetails}</p>
                                            </div>

                                            <div className="md:col-span-1">
                                                <h4 className="font-medium text-gray-700 mb-2">Nutrition</h4>
                                                <div className="space-y-1">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-600">Carbs</span>
                                                        <span className="text-sm font-medium">{meal.carbohydrates}g</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(meal.carbohydrates / 100) * 100}%` }}></div>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-600">Protein</span>
                                                        <span className="text-sm font-medium">{meal.protein}g</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(meal.protein / 30) * 100}%` }}></div>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-600">Fats</span>
                                                        <span className="text-sm font-medium">{meal.fats}g</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(meal.fats / 40) * 100}%` }}></div>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-600">Fiber</span>
                                                        <span className="text-sm font-medium">{meal.fiber}g</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(meal.fiber / 25) * 100}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:col-span-1">
                                                <h4 className="font-medium text-gray-700 mb-2">Suitability</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm">{meal.dietaryPreference} Diet</span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm">Allergens: {meal.allergenInformation !== "None" ? meal.allergenInformation : "No known allergens"}</span>
                                                    </div>

                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm">Cooking: {meal.cookingMethod}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <p className="text-sm text-gray-500">
                                These recommendations are based on your health profile and should be reviewed with a healthcare professional.
                            </p>
                            <Button variant="outline" onClick={() => setMealRecommendations([])}>
                                Reset
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}