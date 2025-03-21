"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { ChevronDown, MoreHorizontal, Search } from "lucide-react"

// Define the health profile type
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

// Sample data
const healthProfiles: HealthProfile[] = [
    {
        id: "1",
        userId: "U001",
        ageGroup: "60–64",
        gender: "Male",
        weightRange: "50–59 kg",
        heightRange: "160–169 cm",
        bmiCategory: "Normal",
        location: "Urban",
        diabetesDuration: "4–6 years",
        medicationDuration: "4–6 years",
        chronicDiseases: ["Hypertension"],
        fastingBloodSugar: "100–125",
        postprandialBloodSugar: "140–179",
        hba1cLevel: "6.5%–7.0%",
        dietaryPreferences: "Non-vegetarian",
        allergies: ["None"],
        avoidanceFoods: ["High-fat meats"],
        cookingMethods: ["Boiling", "Stir-frying"]
    },
    {
        id: "2",
        userId: "U002",
        ageGroup: "55–59",
        gender: "Female",
        weightRange: "60–69 kg",
        heightRange: "150–159 cm",
        bmiCategory: "Overweight",
        location: "Urban",
        diabetesDuration: "7–10 years",
        medicationDuration: "7–10 years",
        chronicDiseases: ["Hypertension", "Hyperlipidemia"],
        fastingBloodSugar: "126–140",
        postprandialBloodSugar: "180–200",
        hba1cLevel: "7.1%–7.5%",
        dietaryPreferences: "Vegetarian",
        allergies: ["Peanuts", "Shellfish"],
        avoidanceFoods: ["Refined sugar", "White rice"],
        cookingMethods: ["Steaming", "Baking"]
    },
    {
        id: "3",
        userId: "U003",
        ageGroup: "65–70",
        gender: "Male",
        weightRange: "70–79 kg",
        heightRange: "170–179 cm",
        bmiCategory: "Normal",
        location: "Rural",
        diabetesDuration: "1–3 years",
        medicationDuration: "1–3 years",
        chronicDiseases: ["None"],
        fastingBloodSugar: "90–99",
        postprandialBloodSugar: "120–139",
        hba1cLevel: "5.7%–6.4%",
        dietaryPreferences: "Non-vegetarian",
        allergies: ["Dairy"],
        avoidanceFoods: ["Processed foods"],
        cookingMethods: ["Grilling", "Roasting"]
    }
]

export default function HealthProfilesTable() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedProfile, setSelectedProfile] = useState<HealthProfile | null>(null)

    // Filter profiles based on search term
    const filteredProfiles = healthProfiles.filter(profile =>
        profile.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.ageGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.bmiCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.gender.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Generate BMI badge color based on category
    const getBmiBadgeColor = (category: string) => {
        switch (category.toLowerCase()) {
            case "underweight":
                return "bg-blue-500"
            case "normal":
                return "bg-green-500"
            case "overweight":
                return "bg-yellow-500"
            case "obese":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div className="container mx-auto p-6">
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Health Profiles</CardTitle>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search profiles..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Filters <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Gender</DropdownMenuItem>
                                <DropdownMenuItem>Age Group</DropdownMenuItem>
                                <DropdownMenuItem>BMI Category</DropdownMenuItem>
                                <DropdownMenuItem>Location</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button>Add Profile</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User ID</TableHead>
                                <TableHead>Age / Gender</TableHead>
                                <TableHead>BMI Category</TableHead>
                                <TableHead>Diabetes Duration</TableHead>
                                <TableHead>Blood Sugar (Fasting)</TableHead>
                                <TableHead>Blood Sugar (PP)</TableHead>
                                <TableHead>HbA1c</TableHead>
                                <TableHead>Diet</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProfiles.map((profile) => (
                                <TableRow key={profile.id}>
                                    <TableCell className="font-medium">{profile.userId}</TableCell>
                                    <TableCell>{profile.ageGroup} / {profile.gender}</TableCell>
                                    <TableCell>
                                        <Badge className={getBmiBadgeColor(profile.bmiCategory)}>
                                            {profile.bmiCategory}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{profile.diabetesDuration}</TableCell>
                                    <TableCell>{profile.fastingBloodSugar} mg/dL</TableCell>
                                    <TableCell>{profile.postprandialBloodSugar} mg/dL</TableCell>
                                    <TableCell>{profile.hba1cLevel}</TableCell>
                                    <TableCell>{profile.dietaryPreferences}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={() => setSelectedProfile(profile)}>
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
                                                {selectedProfile && (
                                                    <div className="grid grid-cols-2 gap-4 py-4">
                                                        <div>
                                                            <h3 className="font-medium">Personal Information</h3>
                                                            <p>Age Group: {selectedProfile.ageGroup}</p>
                                                            <p>Gender: {selectedProfile.gender}</p>
                                                            <p>Weight: {selectedProfile.weightRange}</p>
                                                            <p>Height: {selectedProfile.heightRange}</p>
                                                            <p>BMI Category: {selectedProfile.bmiCategory}</p>
                                                            <p>Location: {selectedProfile.location}</p>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium">Medical Information</h3>
                                                            <p>Diabetes Duration: {selectedProfile.diabetesDuration}</p>
                                                            <p>Medication Duration: {selectedProfile.medicationDuration}</p>
                                                            <p>Chronic Diseases: {selectedProfile.chronicDiseases.join(", ")}</p>
                                                            <p>Fasting Blood Sugar: {selectedProfile.fastingBloodSugar} mg/dL</p>
                                                            <p>Postprandial Blood Sugar: {selectedProfile.postprandialBloodSugar} mg/dL</p>
                                                            <p>HbA1c Level: {selectedProfile.hba1cLevel}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <h3 className="font-medium">Dietary Information</h3>
                                                            <p>Preferences: {selectedProfile.dietaryPreferences}</p>
                                                            <p>Allergies: {selectedProfile.allergies.join(", ")}</p>
                                                            <p>Avoidance Foods: {selectedProfile.avoidanceFoods.join(", ")}</p>
                                                            <p>Cooking Methods: {selectedProfile.cookingMethods.join(", ")}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <DialogFooter className="sm:justify-between">
                                                    <Button variant="outline">Edit Profile</Button>
                                                    <Button>View Diet Plan</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}