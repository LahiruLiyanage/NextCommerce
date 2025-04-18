'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Note the change from "next/router" to "next/navigation"

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to products page
        router.push('/products');
    }, [router]);

    // Optional loading state to show before redirect to the main happens
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Redirecting to products page...</p>
        </div>
    );
}