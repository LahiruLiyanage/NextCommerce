import { products } from "@/app/product-data";

export async function GET() {
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    });
}