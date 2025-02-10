import ProductsList from "../ProductsList";

export default async function ProductsPage() {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Products</h1>
            <ProductsList products={products} />
        </div>
    );
}

// import ProductsList from "../ProductsList";
// import { products } from '../product-data';
//
// export default function ProductsPage() {
//     return (
//         <div className="container mx-auto p-8">
//             <h1 className="text-4xl font-bold mb-8">Products</h1>
//             <ProductsList products={products} />
//         </div>
//     );
// }