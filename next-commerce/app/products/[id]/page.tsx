import { products } from "@/app/product-data";
import NotFoundPage from "@/app/not-found";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = products.find((product) => product.id === params.id);

    if (!product) {
        return <NotFoundPage/>;
    }

    return (
        <>
            <h1>{product.name}</h1>
            <p>${product.price}</p>
            <h3>Description:</h3>
            <p>{product.description}</p>
        </>
    );
}
