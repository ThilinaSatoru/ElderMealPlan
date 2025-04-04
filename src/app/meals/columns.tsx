"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

// Define the meal plan data type
export type MealPlan = {
    id: number
    meal_id: number
    meal_name: string
    meal_type: string
    meal_details: string
    calories: number
    carbs: number
    protein: number
    fiber: number
    glycemic_load: string
    allergy_status: string
    preferences: string
    nutrition: {
        id: number
        meal_id: number
        glycemic_index: number
        calories: number
        carbohydrates: number
        protein: number
        fats: number
        fiber: number
        sodium: number
        sugar: number
    }[]
}

// Define color mappings for badges
const glycemicColors: Record<string, string> = {
    "low": "bg-green-300 hover:bg-green-400 text-green-900",
    "medium": "bg-yellow-300 hover:bg-yellow-400 text-yellow-900",
    "high": "bg-red-300 hover:bg-red-400 text-red-900",
};

const preferencesColors: Record<string, string> = {
    "non-vegetarian": "bg-red-300 hover:bg-red-400 text-red-900",
    "vegetarian": "bg-green-300 hover:bg-green-400 text-green-900",
    "vegan": "bg-purple-300 hover:bg-purple-400 text-purple-900",
    "pescetarian": "bg-blue-300 hover:bg-blue-400 text-blue-900",
};

export const meal_plan_columns: ColumnDef<MealPlan>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "meal_id",
        header: "Meal ID",
    },
    {
        accessorKey: "meal_name",
        header: "Meal Plan",
    },
    {
        accessorKey: "meal_type",
        header: "Meal Type",
    },
    {
        accessorKey: "meal_details",
        header: "Description",
        cell: ({ row }) => {
            const details = row.getValue("meal_details") as string
            return (
                <div className="max-w-[200px] truncate" title={details}>
                    {details}
                </div>
            )
        },
    },
    {
        accessorKey: "calories",
        header: "Calories",
        cell: ({ row }) => {
            const calories = row.getValue("calories") as number
            return <div>{calories} kcal</div>
        },
    },
    {
        id: "macros",
        header: "Macros (g)",
        cell: ({ row }) => {
            const meal = row.original
            return (
                <div className="text-sm">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">C:</span> {meal.carbs}
                        <span className="font-medium">P:</span> {meal.protein}
                        <span className="font-medium">F:</span> {meal.fiber}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "glycemic_load",
        header: "Glycemic Load",
        cell: ({ row }) => {
            const glycemicLoad = row.getValue("glycemic_load") as string
            return (
                <Badge className={glycemicColors[glycemicLoad.toLowerCase()] || "bg-gray-300"}>
                    {glycemicLoad}
                </Badge>
            )
        },
    },
    {
        accessorKey: "preferences",
        header: "Diet Type",
        cell: ({ row }) => {
            const preference = row.getValue("preferences") as string
            return (
                <Badge className={preferencesColors[preference.toLowerCase()] || "bg-gray-300"}>
                    {preference}
                </Badge>
            )
        },
    },
    {
        accessorKey: "allergy_status",
        header: "Allergens",
        cell: ({ row }) => {
            const allergyStatus = row.getValue("allergy_status") as string
            return allergyStatus === "None" ? (
                <span className="text-green-600">None</span>
            ) : (
                <Badge variant="outline" className="text-red-600 border-red-300">
                    {allergyStatus}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const meal = row.original

            // Calculate percentage of daily values (example values)
            const dailyCalories = 2000;
            const dailyCarbs = 275;
            const dailyProtein = 50;
            const dailyFat = 78;

            const caloriesPercent = Math.round((meal.calories / dailyCalories) * 100);
            const carbsPercent = Math.round((meal.nutrition[0].carbohydrates / dailyCarbs) * 100);
            const proteinPercent = Math.round((meal.nutrition[0].protein / dailyProtein) * 100);
            const fatPercent = Math.round((meal.nutrition[0].fats / dailyFat) * 100);

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} aria-label="More options">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>{meal.meal_name} - {meal.meal_type}</DialogTitle>
                            <DialogDescription>
                                {meal.meal_details}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <div>
                                <h3 className="font-medium mb-2">Nutrition Summary</h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm">
                                            <span>Calories: {meal.nutrition[0].calories} kcal</span>
                                            <span>{caloriesPercent}% DV</span>
                                        </div>
                                        <Progress value={caloriesPercent} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm">
                                            <span>Carbs: {meal.nutrition[0].carbohydrates}g</span>
                                            <span>{carbsPercent}% DV</span>
                                        </div>
                                        <Progress value={carbsPercent} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm">
                                            <span>Protein: {meal.nutrition[0].protein}g</span>
                                            <span>{proteinPercent}% DV</span>
                                        </div>
                                        <Progress value={proteinPercent} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm">
                                            <span>Fats: {meal.nutrition[0].fats}g</span>
                                            <span>{fatPercent}% DV</span>
                                        </div>
                                        <Progress value={fatPercent} className="h-2" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Additional Information</h3>
                                <div className="space-y-2">
                                    <p className="text-sm">
                                        <span className="font-medium">Glycemic Index:</span> {meal.nutrition[0].glycemic_index}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Glycemic Load:</span> {meal.glycemic_load}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Fiber:</span> {meal.nutrition[0].fiber}g
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Sodium:</span> {meal.nutrition[0].sodium}mg
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Sugar:</span> {meal.nutrition[0].sugar}g
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Allergens:</span> {meal.allergy_status}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="flex justify-between">
                            <Button variant="outline">Swap Meal</Button>
                            <Button>Add to Plan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        },
    },
]