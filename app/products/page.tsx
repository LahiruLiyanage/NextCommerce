// Add this to make the page dynamic instead of static
import ProductsList from "@/app/ProductsList";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    let products = [];
    let cartProducts = [];

    try {
        // Use relative URLs instead of absolute URLs with localhost
        const response = await fetch(`/api/products`, {
            cache: 'no-store' // Ensure fresh data
        });

        if (response.ok) {
            products = await response.json();
        }

        try {
            const response2 = await fetch(`/api/users/1/cart`, {
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