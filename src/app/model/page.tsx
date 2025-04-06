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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Meal = {
    AllergyStatus: string;
    Calories: number;
    "Carbs(g)": number;
    "Fiber(g)": number;
    GlycemicLoad: string;
    MealDetails: string;
    MealID: number;
    MealName: string;
    Preferences: string;
    "Protein(g)": number;
    Type: string;
};

type Nutrition = {
    "Fat(g)": number;
    "NetCarbs(g)": number;
    "Protein(g)": number;
    TotalCalories: number;
};

type UserProfileMatch = {
    AllergiesAvoided: string[];
    DietaryPreference: string;
    GlycemicLoad: string;
    SpecialConditions: string;
    TriggerFoodsAvoided: string[];
};

type MealPlan = {
    MealPlanID: number;
    Meals: Meal[];
    Nutrition: Nutrition;
    PlanName: string;
    SpecialRecommendations: string[];
    UserProfileMatch: UserProfileMatch;
};

// Form schema validation
const formSchema = z.object({
    Age: z.number().min(60, "Age is required").max(120, "Age must be realistic"),
    Gender: z.enum(["Male", "Female"]),
    Weight: z.number().min(20, "Weight must be realistic").max(300, "Weight must be realistic"),
    Height: z.number().min(100, "Height must be realistic").max(250, "Height must be realistic"),
    Allergies: z.enum(["None", "Coconut sambol", "Pickled vegetables", "Kiribath"]),
    DietFollowed: z.enum(["Vegetarian", "Vegan", "Pescetarian", "Non-vegetarian"]),
    FastingGlucose: z.number().min(50, "Glucose level must be realistic").max(500, "Glucose level must be realistic"),
    OtherConditions: z.enum(["None", "Kidney disease", "Heart disease", "High cholesterol", "Hypertension"]),
    TriggerFoods: z.enum(["None", "Sugary snacks", "White bread", "Nuts", "Dairy"]),
});

export default function HealthProfilePage() {
    const [mealRecommendations, setMealRecommendations] = useState<MealPlan[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // Age: 0,
            Gender: "Female",
            // Weight: 0,
            // Height: 0,
            Allergies: "None",
            DietFollowed: "Vegetarian",
            // FastingGlucose: 0,
            OtherConditions: "None",
            TriggerFoods: "None",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/ai/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    Age: values.Age,
                    Allergies: values.Allergies,
                    DietFollowed: values.DietFollowed,
                    FastingGlucose: values.FastingGlucose,
                    Gender: values.Gender,
                    Height: values.Height,
                    OtherConditions: values.OtherConditions,
                    TriggerFoods: values.TriggerFoods,
                    Weight: values.Weight
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMealRecommendations([data]);
        } catch (error) {
            console.error('Error fetching meal recommendations:', error);
            // You might want to show an error message to the user here
        } finally {
            setIsLoading(false);
        }
    }

    const getMealTypeColor = (mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack') => {
        switch (mealType.toLowerCase()) {
            case 'breakfast': return 'from-orange-400 to-yellow-300';
            case 'lunch': return 'from-green-400 to-teal-300';
            case 'dinner': return 'from-blue-400 to-indigo-300';
            case 'snack': return 'from-purple-400 to-pink-300';
            default: return 'from-gray-400 to-gray-300';
        }
    };

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
                                        name="Age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Age</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter your age"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="Gender"
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
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="Weight"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Weight (kg)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter your weight in kg"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="Height"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Height (cm)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your height in cm"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="FastingGlucose"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fasting Glucose (mg/dL)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter your fasting glucose level"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="DietFollowed"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Diet Followed</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your diet" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                                                        <SelectItem value="Vegan">Vegan</SelectItem>
                                                        <SelectItem value="Pescetarian">Pescetarian</SelectItem>
                                                        <SelectItem value="Non-vegetarian">Non-vegetarian</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="Allergies"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Allergies</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select allergies" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="None">None</SelectItem>
                                                        <SelectItem value="Coconut sambol">Coconut sambol</SelectItem>
                                                        <SelectItem value="Pickled vegetables">Pickled vegetables</SelectItem>
                                                        <SelectItem value="Kiribath">Kiribath</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="OtherConditions"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Other Conditions</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select other conditions" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="None">None</SelectItem>
                                                        <SelectItem value="Kidney disease">Diabetes</SelectItem>
                                                        <SelectItem value="Heart disease">Prediabetes</SelectItem>
                                                        <SelectItem value="High cholesterol">High cholesterol</SelectItem>
                                                        <SelectItem value="Hypertension">Hypertension</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="TriggerFoods"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Trigger Foods</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select trigger foods" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="None">None</SelectItem>
                                                        <SelectItem value="Sugary snacks">Sugary snacks</SelectItem>
                                                        <SelectItem value="White bread">White bread</SelectItem>
                                                        <SelectItem value="Nuts">Nuts</SelectItem>
                                                        <SelectItem value="Dairy">Dairy</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
{/* recommendation page                 *************************************************************************************************************** */}
                {mealRecommendations.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl">
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 text-white">
                                <div className="flex items-center">
                                    <div className="mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
                                            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                                            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79 4-4 4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-bold">{mealRecommendations[0]?.PlanName}</CardTitle>
                                        <CardDescription className="text-lg text-blue-100">
                                            Personalized nutrition optimized for your needs
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6 p-6">
                                {/* Nutrition Summary - Colorful Cards with Icons */}
                                <div className="bg-white p-5 rounded-xl shadow-md">
                                    <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                        </svg>
                                        Daily Nutrition Summary
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-blue-700 font-medium">Total Calories</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                                                </svg>
                                            </div>
                                            <p className="font-bold text-2xl text-blue-800">{mealRecommendations[0]?.Nutrition.TotalCalories} kcal</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-green-700 font-medium">Protein</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
                                                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
                                                </svg>
                                            </div>
                                            <p className="font-bold text-2xl text-green-800">{mealRecommendations[0]?.Nutrition["Protein(g)"]}g</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-yellow-700 font-medium">Net Carbs</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                                                </svg>
                                            </div>
                                            <p className="font-bold text-2xl text-yellow-800">{mealRecommendations[0]?.Nutrition["NetCarbs(g)"]}g</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-red-700 font-medium">Fat</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                                                    <path d="M20 13c.55 0 1-.45 1-1s-.45-1-1-1h-1V5h1c.55 0 1-.45 1-1s-.45-1-1-1H10c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h1v6H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1h-1v-6h1zm-3 6H7v-6h10v6z" />
                                                </svg>
                                            </div>
                                            <p className="font-bold text-2xl text-red-800">{mealRecommendations[0]?.Nutrition["Fat(g)"]}g</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Daily Meal Plan with Colorful Headers */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg text-blue-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                            <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                                        </svg>
                                        Daily Meal Plan
                                    </h3>

                                    {mealRecommendations[0]?.Meals.map((meal) => (
                                        <div key={`${meal.MealID}-${meal.Type}`} className="border rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                                            <div className={`bg-gradient-to-r ${getMealTypeColor(meal.Type as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack')} p-4 text-white`}>
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-semibold text-lg capitalize flex items-center">
                                                        {meal.Type === "breakfast" && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                                                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
                                                            </svg>
                                                        )}
                                                        {meal.Type === "lunch" && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                                                <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                                                            </svg>
                                                        )}
                                                        {meal.Type === "dinner" && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                                                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                                                            </svg>
                                                        )}
                                                        {meal.Type === "snack" && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                                                <path d="M18 10V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-2 0H4V5h12v5zm4-2h-2v2h2v-2zm0-5h-2v2h2V3zM2 19h18v2H2v-2zm18-5h-2v2h2v-2z" />
                                                            </svg>
                                                        )}
                                                        {meal.Type}
                                                    </h4>
                                                    <span className="bg-white text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                                        {meal.Preferences}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-white">{meal.MealDetails}</p>
                                            </div>

                                            <div className="p-4 bg-white">
                                                <div className="grid grid-cols-4 gap-3">
                                                    <div className="text-center">
                                                        <p className="text-xs text-gray-500 mb-1">Calories</p>
                                                        <p className="font-semibold text-blue-800">{meal.Calories} kcal</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-xs text-gray-500 mb-1">Protein</p>
                                                        <p className="font-semibold text-green-700">{meal["Protein(g)"]}g</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-xs text-gray-500 mb-1">Carbs</p>
                                                        <p className="font-semibold text-yellow-700">{meal["Carbs(g)"]}g</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-xs text-gray-500 mb-1">Fiber</p>
                                                        <p className="font-semibold text-purple-700">{meal["Fiber(g)"]}g</p>
                                                    </div>
                                                </div>

                                                {meal.AllergyStatus !== "None" && (
                                                    <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-2 rounded">
                                                        <span className="text-sm text-red-700 flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                                            </svg>
                                                            {meal.AllergyStatus}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Special Recommendations */}
                                <div className="bg-gradient-to-r from-amber-50 to-yellow-100 p-5 rounded-xl shadow-md border-l-4 border-yellow-400">
                                    <h3 className="font-bold text-lg mb-3 text-yellow-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                                        </svg>
                                        Special Recommendations
                                    </h3>
                                    <ul className="space-y-2">
                                        {mealRecommendations[0]?.SpecialRecommendations.map((rec, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-yellow-600 mt-0.5">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                <span className="text-gray-800">{rec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Profile Match */}
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl shadow-md">
                                    <h3 className="font-bold text-lg mb-3 text-indigo-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                        Profile Match Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <h4 className="font-medium text-indigo-700 mb-1">Dietary Preference</h4>
                                            <p className="text-gray-800 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-indigo-500">
                                                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                                                </svg>
                                                {mealRecommendations[0]?.UserProfileMatch.DietaryPreference}
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <h4 className="font-medium text-indigo-700 mb-1">Special Conditions</h4>
                                            <p className="text-gray-800 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-indigo-500">
                                                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
                                                </svg>
                                                {mealRecommendations[0]?.UserProfileMatch.SpecialConditions}
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <h4 className="font-medium text-indigo-700 mb-1">Allergies Avoided</h4>
                                            <p className="text-gray-800 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-indigo-500">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
                                                </svg>
                                                {mealRecommendations[0]?.UserProfileMatch.AllergiesAvoided.length > 0
                                                    ? mealRecommendations[0]?.UserProfileMatch.AllergiesAvoided.join(", ")
                                                    : "None"}
                                            </p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <h4 className="font-medium text-indigo-700 mb-1">Trigger Foods Avoided</h4>
                                            <p className="text-gray-800 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-indigo-500">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" />
                                                </svg>
                                                {mealRecommendations[0]?.UserProfileMatch.TriggerFoodsAvoided.length > 0
                                                    ? mealRecommendations[0]?.UserProfileMatch.TriggerFoodsAvoided.join(", ")
                                                    : "None"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}


            </div>
        </div>
    );
}