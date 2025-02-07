import Image from 'next/image';
import Link from 'next/link';
import { Product } from "./product-data";

export default function ProductsList({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
                <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="dark:bg-gray-900 bg-white rounded-lg shadow-md dark:hover:shadow-gray-800 p-4 hover:shadow-lg transition duration-300"
                >
                    <div className="flex justify-center mb-4 h-48 relative"> {/* Added height and relative positioning */}
                        <Image
                            src={'/' + product.imageUrl}
                            alt="Product image"
                            fill // Fill the container
                            className="object-cover rounded-md" // Cover the container, maintaining aspect ratio
                        />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="dark:text-gray-300 text-gray-600">${product.price}</p>
                </Link>
            ))}
        </div>
    );
}