import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-2">
                <span className="font-bold text-xl">MealPlan-ML</span>
            </div>
            <div className="hidden md:flex space-x-6">
                <a href="/" className="hover:text-primary">Home</a>
                {/* <a href="/profiles" className="hover:text-primary">Patients</a> */}
                <a href="/meals" className="hover:text-primary">Meals</a>
                {/* <a href="/model" className="hover:text-primary"> MealPlan</a> */}
                <a href="#" className="hover:text-primary">About</a>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="outline">Log in</Button>
                {/* <Button>Sign up</Button> */}
                <a href="/model" className="hover:text-primary"><Button className="cursor-pointer">Generate Your Meal Plan</Button></a>
            </div>
        </nav>
    );
};