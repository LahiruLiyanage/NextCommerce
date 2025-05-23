// Add this to make the page dynamic instead of static
import ProductsList from "@/app/ProductsList";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    let products = [];
    let cartProducts = [];

    try {
        // Get the host from request headers
        const headersList = await headers();
        const host = headersList.get("host") || "";
        const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
        const baseUrl = `${protocol}://${host}`;

        // Use absolute URLs with the detected base URL
        const response = await fetch(`${baseUrl}/api/products`, {
            cache: 'no-store' // Ensure fresh data
        });

        if (response.ok) {
            products = await response.json();
        }

        try {
            const response2 = await fetch(`${baseUrl}/api/users/1/cart`, {
                cache: 'no-store',
            });

            if (response2.ok) {
                cartProducts = await response2.json();
            }
        } catch (cartError) {
            console.error('Error fetching cart:', cartError);
            // Continue with empty cart
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        // Continue with empty products
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Products</h1>
            <ProductsList products={products} initialCartProducts={cartProducts} />
        </div>
    );
}