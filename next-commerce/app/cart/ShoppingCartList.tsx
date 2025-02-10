'use client';

import { useState } from 'react';
import { Product } from '../product-data';
import Link from 'next/link';

export default function ShoppingCartList({ initialCartProducts } : {initialCartProducts: Product[]}) {
    const [cartProducts] = useState(initialCartProducts);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <ul className="space-y-4"> {/* List for cart items */}
                {cartProducts.map(product => (
                    <li key={product.id} className="dark:bg-gray-900 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                        <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="dark:text-gray-300 text-gray-600">${product.price}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}