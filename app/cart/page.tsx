import ShoppingCartList from "@/app/cart/ShoppingCartList";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function CartPage() {
    try {
        // Get the host from request headers
        const headersList = await headers();
        const host = headersList.get("host") || "";
        const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
        const baseUrl = `${protocol}://${host}`;

        console.log(`Fetching cart from: ${baseUrl}/api/users/1/cart`);

        const response = await fetch(`${baseUrl}/api/users/1/cart`, {
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json'
            },
            next: { revalidate: 0 } // Ensure fresh data on each request
        });

        // Check if response is OK and is JSON
        if (!response.ok) {
            console.error(`Cart API error: ${response.status} ${response.statusText}`);
            // Try to get response text for debugging
            const text = await response.text();
            console.error(`Response body: ${text}`);
            return <ShoppingCartList initialCartProducts={[]} />;
        }

        // Check content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error(`Invalid content type: ${contentType}`);
            return <ShoppingCartList initialCartProducts={[]} />;
        }

        const cartProducts = await response.json();
        return <ShoppingCartList initialCartProducts={cartProducts} />;
    } catch (error) {
        console.error("Error loading cart:", error);
        // Return empty cart on error
        return <ShoppingCartList initialCartProducts={[]} />;
    }
}