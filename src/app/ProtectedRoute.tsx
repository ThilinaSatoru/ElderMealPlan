//ProtectedRoute.tsx
"use client"
import {ReactNode, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const triggerLoginDialog = () => {
    // Create and dispatch a custom event that Navbar can listen for
    const event = new CustomEvent('showLoginDialog');
    window.dispatchEvent(event);
};

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const authCheck = () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                // Store the path the user was trying to access
                localStorage.setItem('redirectAfterLogin', pathname);
                // Redirect to login page
                router.push('/');

                // Trigger login dialog to appear
                // Small timeout to ensure redirect happens first and component is mounted
                setTimeout(() => {
                    triggerLoginDialog();
                }, 100);
            } else {
                setAuthorized(true);
            }
        };

        authCheck();
    }, [router]);

    return authorized ? children : null;
}