import ProfilesDataTable from "./table";

export default async function Profiles() {

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold">Meals</h1>
            <p className="text-gray-500">List of all Meals Available.</p>
            <ProfilesDataTable />
        </div>
    )
}
