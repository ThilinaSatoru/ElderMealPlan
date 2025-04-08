import ProfilesDataTable from "./table";
import ProtectedRoute from "@/app/ProtectedRoute";

export default async function Profiles() {

    return (
        <ProtectedRoute>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold">Meals</h1>
                <p className="text-gray-500">List of all Meals Available.</p>
                <ProfilesDataTable/>
            </div>
        </ProtectedRoute>
    )
}
