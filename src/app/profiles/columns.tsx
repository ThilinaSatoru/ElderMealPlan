"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

// This type is used to define the shape of our data.
export type HealthProfile = {
    id: string
    userId: string
    ageGroup: string
    gender: string
    weightRange: string
    heightRange: string
    bmiCategory: string
    location: string
    diabetesDuration: string
    medicationDuration: string
    chronicDiseases: string[]
    fastingBloodSugar: string
    postprandialBloodSugar: string
    hba1cLevel: string
    dietaryPreferences: string
    allergies: string[]
    avoidanceFoods: string[]
    cookingMethods: string[]
}

const genderColors: Record<string, "secondary" | "default" | "destructive" | "outline" | null | undefined> = {
    male: "default",
    female: "secondary",
    other: "outline",
}

const dietColors: Record<string, string> = {
    "Non-vegetarian": "bg-red-300 hover:bg-red-400 text-red-900",
    Vegetarian: "bg-green-300 hover:bg-green-400 text-green-900",
    Pescetarian: "bg-blue-300 hover:bg-blue-400 text-blue-900",
    Vegan: "bg-purple-300 hover:bg-purple-400 text-purple-900",
};

const bmiColors: Record<string, string> = {
    underweight: "bg-blue-300 hover:bg-blue-400 text-blue-900",
    normal: "bg-green-300 hover:bg-green-400 text-green-900",
    overweight: "bg-yellow-300 hover:bg-yellow-400 text-yellow-900",
    obese: "bg-red-300 hover:bg-red-400 text-red-900",
};

export const health_profile_columns: ColumnDef<HealthProfile>[] = [
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
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "ageGroup",
        header: "Age Group",
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
            const gender = row.getValue("gender") as string
            return (
                <Badge variant={genderColors[gender.toLowerCase()] || "secondary"}>
                    {gender}
                </Badge>
            )
        },
    },
    {
        id: "bodyMetrics",
        header: "Body Metrics",
        cell: ({ row }) => {
            const profile = row.original
            return (
                <div>
                    <div>{profile.weightRange}</div>
                    <div className="text-xs text-muted-foreground">{profile.heightRange}</div>
                </div>
            )
        },
    },
    {
        accessorKey: "bmiCategory",
        header: "BMI Category",
        cell: ({ row }) => {
            const bmiCategory = row.getValue("bmiCategory") as string

            // Get appropriate color based on BMI category
            const getBmiColor = (category: string) => {
                switch (category.toLowerCase()) {
                    case "underweight":
                        return "bg-blue-500 hover:bg-blue-600"
                    case "normal":
                        return "bg-green-500 hover:bg-green-600"
                    case "overweight":
                        return "bg-yellow-500 hover:bg-yellow-600"
                    case "obese":
                        return "bg-red-500 hover:bg-red-600"
                    default:
                        return "bg-gray-500 hover:bg-gray-600"
                }
            }

            return (
                <Badge className={bmiColors[bmiCategory.toLowerCase()] || "bg-gray-500"}>
                    {bmiCategory}
                </Badge>
            )
        },
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "diabetesDuration",
        header: "Diabetes Duration",
    },
    {
        accessorKey: "fastingBloodSugar",
        header: "Fasting Blood Sugar",
        cell: ({ row }) => {
            const value = row.getValue("fastingBloodSugar") as string
            return <div>{value} mg/dL</div>
        },
    },
    {
        accessorKey: "postprandialBloodSugar",
        header: "PP Blood Sugar",
        cell: ({ row }) => {
            const value = row.getValue("postprandialBloodSugar") as string
            return <div>{value} mg/dL</div>
        },
    },
    {
        accessorKey: "hba1cLevel",
        header: "HbA1c",
    },
    {
        accessorKey: "dietaryPreferences",
        header: "Diet Preference",
        cell: ({ row }) => {
            const diet = row.getValue("dietaryPreferences") as string
            return (
                <Badge className={dietColors[diet] || "bg-gray-500"}>
                    {diet}
                </Badge>
            )
        },
    },
    {
        accessorKey: "chronicDiseases",
        header: "Chronic Diseases",
        cell: ({ row }) => {
            const diseases = row.original.chronicDiseases
            return (
                <div className="flex flex-wrap gap-1">
                    {diseases.map((disease, index) => (
                        disease !== "None" ? (
                            <Badge key={index} variant="outline" className="text-xs">
                                {disease}
                            </Badge>
                        ) : "None"
                    ))}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const profile = row.original

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} aria-label="More options">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Profile Details - {profile.userId}</DialogTitle>
                            <DialogDescription>
                                Complete health profile information
                            </DialogDescription>
                        </DialogHeader>
                        {profile && (
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div>
                                    <h3 className="font-medium">Personal Information</h3>
                                    <p>Age Group: {profile.ageGroup}</p>
                                    <p>Gender: {profile.gender}</p>
                                    <p>Weight: {profile.weightRange}</p>
                                    <p>Height: {profile.heightRange}</p>
                                    <p>BMI Category: {profile.bmiCategory}</p>
                                    <p>Location: {profile.location}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Medical Information</h3>
                                    <p>Diabetes Duration: {profile.diabetesDuration}</p>
                                    <p>Medication Duration: {profile.medicationDuration}</p>
                                    <p>Chronic Diseases: {profile.chronicDiseases.join(", ")}</p>
                                    <p>Fasting Blood Sugar: {profile.fastingBloodSugar} mg/dL</p>
                                    <p>Postprandial Blood Sugar: {profile.postprandialBloodSugar} mg/dL</p>
                                    <p>HbA1c Level: {profile.hba1cLevel}</p>
                                </div>
                                <div className="col-span-2">
                                    <h3 className="font-medium">Dietary Information</h3>
                                    <p>Preferences: {profile.dietaryPreferences}</p>
                                    <p>Allergies: {profile.allergies.join(", ")}</p>
                                    <p>Avoidance Foods: {profile.avoidanceFoods.join(", ")}</p>
                                    <p>Cooking Methods: {profile.cookingMethods.join(", ")}</p>
                                </div>
                            </div>
                        )}
                        <DialogFooter className="sm:justify-between">
                            <Button variant="outline">Edit Profile</Button>
                            <Button>View Diet Plan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        },
    },
]