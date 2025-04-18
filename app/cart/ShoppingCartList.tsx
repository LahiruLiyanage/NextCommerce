'use client';

import { useState, useEffect } from 'react';
import { Product } from '../product-data';
import Link from 'next/link';

export default function ShoppingCartList({ initialCartProducts } : {initialCartProducts: Product[]}) {
    const [cartProducts, setCartProducts] = useState(initialCartProducts);
    const [baseUrl, setBaseUrl] = useState('');

    // Set base URL once when component mounts
    useEffect(() => {
        // In the client component, we can use window.location
        const currentUrl = window.location.origin;
        setBaseUrl(currentUrl);
    }, []);

    async function removeFromCart(productId: string) {
        try {
            const response = await fetch(`${baseUrl}/api/users/1/cart`, {
                method: 'DELETE',
                body: JSON.stringify({
                    productId,
                }),
                headers: { 'Content-Type': 'application/json', },
            });

            if (response.ok) {
                const updatedCartProducts = await response.json();
                setCartProducts(updatedCartProducts);
            } else {
                console.error("Failed to remove item:", response.status);
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            {cartProducts.length === 0 ? (
                <p className="text-lg">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4"> {/* List for cart items */}
                    {cartProducts.map(product => (
                        <li key={product.id} className="dark:bg-gray-900 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                            <Link href={`/products/${product.id}`}>
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="dark:text-gray-300 text-gray-600">${product.price}</p>
                                <div className="flex items-center justify-end">
                                    <button className="dark:bg-indigo-900 hover:shadow-lg bg-blue-500 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 px-4 rounded"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFromCart(product.id)
                                            }}>Remove from Cart</button>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}