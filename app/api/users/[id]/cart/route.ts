import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/api/db';

type Params = {
    id: string;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Params }
) {
    try {
        const { db } = await connectToDb();
        const userId = params.id;

        const userCart = await db.collection('carts').findOne({ userId });

        if (!userCart) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: {'Content-Type': 'application/json'},
            });
        }

        const cartIds = userCart.cartIds || [];
        const cartProducts = await db.collection('products').find({ id: { $in: cartIds } }).toArray();

        return new Response(JSON.stringify(cartProducts), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error("GET cart error:", error);
        return new Response(JSON.stringify({ error: "Failed to retrieve cart" }), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

type CartBody = {
    productId: string;
}

export async function POST(
    request: NextRequest,
    { params }: { params: Params }  // Fixed: params is not a Promise
) {
    try {
        const { db } = await connectToDb();
        const userId = params.id;  // Direct access, no need to await

        const body: CartBody = await request.json();
        const productId = body.productId;

        if (!productId) {
            return new Response(JSON.stringify({ error: "Product ID is required" }), {
                status: 400,
                headers: {'Content-Type': 'application/json'},
            });
        }

        const result = await db.collection('carts').findOneAndUpdate(
            { userId },
            { $push: { cartIds: productId } },
            { upsert: true, returnDocument: 'after' }
        );

        // Ensure we have the value property from the result
        const updatedCart = result.value || result;

        const cartProducts = await db.collection('products').find({
            id: { $in: updatedCart.cartIds || [] }
        }).toArray();

        return new Response(JSON.stringify(cartProducts), {
            status: 201,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error("POST cart error:", error);
        return new Response(JSON.stringify({ error: "Failed to add item to cart" }), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Params }  // Fixed: params is not a Promise
) {
    try {
        const { db } = await connectToDb();
        const userId = params.id;  // Direct access, no need to await

        const body = await request.json();
        const productId = body.productId;

        if (!productId) {
            return new Response(JSON.stringify({ error: "Product ID is required" }), {
                status: 400,
                headers: {'Content-Type': 'application/json'},
            });
        }

        const result = await db.collection('carts').findOneAndUpdate(
            { userId },
            { $pull: { cartIds: productId } },
            { returnDocument: 'after' }
        );

        // Ensure we have the value property from the result
        // @ts-ignore
        const updatedCart = result.value || result;

        if (!updatedCart) {
            return new Response(JSON.stringify([]), {
                status: 202,
                headers: {'Content-Type': 'application/json'},
            });
        }

        const cartProducts = await db.collection('products').find({
            id: { $in: updatedCart.cartIds || [] }
        }).toArray();

        return new Response(JSON.stringify(cartProducts), {
            status: 202,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error("DELETE cart error:", error);
        return new Response(JSON.stringify({ error: "Failed to remove item from cart" }), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}