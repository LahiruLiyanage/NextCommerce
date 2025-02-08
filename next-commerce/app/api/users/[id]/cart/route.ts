import { NextRequest } from 'next/server';
import { products } from "@/app/product-data";

type ShoppingCart = Record<string, string[]>

const carts: ShoppingCart = {
    '1' : ['123', '234'],
    '2' : ['345', '456'],
    '3' : ['234'],
}

type Params = {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    const userId = params.id;
    const productIds = carts[userId];
    const cartProducts = productIds.map(id => products.find(product => product.id === id));

    if (productIds === undefined) {
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(cartProducts), {
        status: 200,
        headers: { 'content-type': 'application/json' },
    });
}

type CartBody = {
    productId: string;
};

export async function POST(request: NextRequest, { params }: { params: Params }){
    const userId = params.id;
    const body: CartBody = await request.json();
    const productId = body.productId;

    carts[userId] = carts[userId] ? carts[userId].concat(productId) : [productId];
    const cartProducts = carts[userId].map(product => products.find(product => product.id === productId));

    return new Response(JSON.stringify(cartProducts), {
        status: 201,
        headers: { 'content-type': 'application/json' },
    })
}
