import NotFoundPage from "@/app/not-found";
import { headers } from "next/headers";

export default async function ProductDetailPage({params}: { params: { id: string } }) {
    try {
        // Get the host from request headers
        const headersList = await headers();
        const host = headersList.get("host") || "";
        const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
        const baseUrl = `${protocol}://${host}`;

        const response = await fetch(`${baseUrl}/api/products/${params.id}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            return <NotFoundPage/>;
        }

        const product = await response.json();

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
    } catch (error) {
        console.error("Error loading product:", error);
        return <NotFoundPage/>;
    }
}