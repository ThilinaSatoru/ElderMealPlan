import ProfilesDataTable from "./table";

export default async function Profiles() {

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold">Profiles</h1>
            <p className="text-gray-500">List of all profiles</p>
            <ProfilesDataTable />
        </div>
    )
}
