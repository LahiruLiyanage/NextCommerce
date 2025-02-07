import {products} from "@/app/product-data";
import NotFoundPage from "@/app/not-found";

export default function ProductDetailPage({params}: { params: { id: string } }) {
    const product = products.find((product) => product.id === params.id);

    if (!product) {
        return <NotFoundPage/>;
    }

    return (
        <div className={"container mx-auto p-8 flex flex-col md:flex-row"}>
            <div className={"md:1/2 mb-4 md:mb-0 md:mr-8"}>
                <img
                    src={"/" + product.imageUrl}
                    alt="Product Image"
                    className={"w-full h-auto rounded-lg shadow-md"}
                />
            </div>
            <div className={"md:w-1/2"}>
                <h1 className={"text-4xl font-bold mb-4"}>{product.name}</h1>
                <p className={"text-2xl text-gray-600 mb-6 dark:text-gray-300 "}>${product.price}</p>
                <h3 className={"text-2xl font-semibold mb-2"}>Description:</h3>
                <p className={"text-gray-700 dark:text-gray-200 "}>{product.description}</p>
            </div>
        </div>
    );
}
