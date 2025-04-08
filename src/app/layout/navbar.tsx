"use client"
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    // Hardcoded credentials
    const validCredentials = {
        username: "admin",
        password: "123"
    };

    // Check for existing login on component mount
    useEffect(() => {
        const authStatus = localStorage.getItem("isLoggedIn");
        if (authStatus === "true") {
            setIsLoggedIn(true);
        }
        const handleShowLoginDialog = () => {
            setShowLoginModal(true);
        };

        window.addEventListener('showLoginDialog', handleShowLoginDialog);

        // Clean up
        return () => {
            window.removeEventListener('showLoginDialog', handleShowLoginDialog);
        };
    }, []);

    const handleLogin = () => {
        if (username === validCredentials.username && password === validCredentials.password) {
            // Set login state locally and in localStorage
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", validCredentials.username);

            setShowLoginModal(false);
            setError("");
            setUsername("");
            setPassword("");

            // If we were redirected from a protected page, go back there
            const redirectPath = localStorage.getItem("redirectAfterLogin");
            if (redirectPath) {
                localStorage.removeItem("redirectAfterLogin");
                router.push(redirectPath);
            }
        } else {
            setError("Invalid username or password");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");

        // Redirect to home if on a protected route
        if (pathname === "/meals" || pathname === "/model") {
            router.push("/");
        }
    };

    return (
        <>
            <nav className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-xl">MealPlan-ML</span>
                </div>
                <div className="hidden md:flex space-x-6">
                    <a href="/" className="hover:text-primary">Home</a>
                    {isLoggedIn && <a href="/meals" className="hover:text-primary">Meals</a>}
                    <a href="#" className="hover:text-primary">About</a>
                </div>
                <div className="flex items-center space-x-4">
                    {!isLoggedIn ? (
                        <Button variant="outline" onClick={() => setShowLoginModal(true)}>Log in</Button>
                    ) : (
                        <>
                            <span
                                className="text-sm">Welcome, {localStorage.getItem("username") || validCredentials.username}</span>
                            <Button variant="outline" onClick={handleLogout}>Log out</Button>
                        </>
                    )}
                    <a href="/model" className="hover:text-primary">
                        <Button className="cursor-pointer">Generate Your Meal Plan</Button>
                    </a>
                </div>
            </nav>

            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Login</h2>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button variant="outline" onClick={() => setShowLoginModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleLogin}>Login</Button>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Hint: Username: admin, Password: password123
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}