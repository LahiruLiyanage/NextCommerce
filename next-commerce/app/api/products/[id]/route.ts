import { NextRequest} from "next/server";
import {products} from "@/app/product-data";

type Params = {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const productId = params.id;

    const product = products.find((product) => product.id === productId);

    if (!product) {
        return new Response('Product not found', {
            status: 404,
        });
    }

    return new Response(JSON.stringify(product), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    })
}