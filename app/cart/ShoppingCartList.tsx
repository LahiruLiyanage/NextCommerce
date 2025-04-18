'use client';

import { useState, useEffect } from 'react';
import { Product } from '../product-data';
import Link from 'next/link';

export default function ShoppingCartList({ initialCartProducts } : {initialCartProducts: Product[]}) {
    const [cartProducts, setCartProducts] = useState(initialCartProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function removeFromCart(productId: string) {
        try {
            setIsLoading(true);
            setError(null);

            // Use relative URL to avoid CORS and base URL issues
            const response = await fetch(`/api/users/1/cart`, {
                method: 'DELETE',
                body: JSON.stringify({
                    productId,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to remove item: ${response.status}`, errorText);
                setError("Failed to remove item from cart");
                return;
            }

            // Check content type
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.error(`Invalid content type: ${contentType}`);
                setError("Received invalid response from server");
                return;
            }

            const updatedCartProducts = await response.json();
            setCartProducts(updatedCartProducts);
        } catch (error) {
            console.error("Error removing item from cart:", error);
            setError("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {isLoading ? (
                <p className="text-lg">Loading...</p>
            ) : cartProducts.length === 0 ? (
                <p className="text-lg">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cartProducts.map(product => (
                        <li key={product.id} className="dark:bg-gray-900 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <Link href={`/products/${product.id}`} className="block mb-4 sm:mb-0 flex-grow">
                                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                    <p className="dark:text-gray-300 text-gray-600">${product.price}</p>
                                </Link>
                                <div>
                                    <button
                                        className="dark:bg-indigo-900 hover:shadow-lg bg-blue-500 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => removeFromCart(product.id)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Removing...' : 'Remove from Cart'}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}