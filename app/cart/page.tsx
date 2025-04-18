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

        const response = await fetch(`${baseUrl}/api/users/1/cart`, {
            cache: 'no-cache',
        });

        const cartProducts = await response.json();

        return (
            <ShoppingCartList initialCartProducts={cartProducts}/>
        );
    } catch (error) {
        console.error("Error loading cart:", error);
        // Return empty cart on error
        return (
            <ShoppingCartList initialCartProducts={[]}/>
        );
    }
}