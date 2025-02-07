import ProductsList from "@/app/ProductsList";
import {products} from "@/app/product-data";

export default function ProductsPage() {
    return (
        <>
            <h1>Products</h1>
            <ProductsList products={products}/>
        </>
    );
}
