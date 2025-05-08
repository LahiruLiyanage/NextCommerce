import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/api/db';

type Params = {
    id: string;
}

export async function GET(
    request: NextRequest,
    context: { params: Params | Promise<Params> }
) {
    try {
        const { db } = await connectToDb();

        // Handle params regardless of whether it's a Promise or not
        const resolvedParams = context.params instanceof Promise ? await context.params : context.params;
        const userId = resolvedParams.id;

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
    context: { params: Params | Promise<Params> }
) {
    try {
        const { db } = await connectToDb();

        // Handle params regardless of whether it's a Promise or not
        const resolvedParams = context.params instanceof Promise ? await context.params : context.params;
        const userId = resolvedParams.id;

        // Verify the userId is accessible
        console.log("POST handler - userId:", userId);

        // Parse request body
        const body: CartBody = await request.json();
        const productId = body.productId;
        console.log("POST handler - productId:", productId);

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
        console.log("POST handler - updated cart:", JSON.stringify(updatedCart));

        const cartProducts = await db.collection('products').find({
            id: { $in: updatedCart.cartIds || [] }
        }).toArray();

        return new Response(JSON.stringify(cartProducts), {
            status: 201,
            headers: {'Content-Type': 'application/json'},
        });
    } catch (error) {
        console.error("POST cart error:", error);
        return new Response(JSON.stringify({ error: "Failed to add item to cart", details: error.message }), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Params | Promise<Params> }
) {
    try {
        const { db } = await connectToDb();

        // Handle params regardless of whether it's a Promise or not
        const resolvedParams = context.params instanceof Promise ? await context.params : context.params;
        const userId = resolvedParams.id;

        // Verify the userId is accessible
        console.log("DELETE handler - userId:", userId);

        const body = await request.json();
        const productId = body.productId;
        console.log("DELETE handler - productId:", productId);

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
        const updatedCart = result?.value || result;
        console.log("DELETE handler - updated cart:", JSON.stringify(updatedCart));

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
        return new Response(JSON.stringify({ error: "Failed to remove item from cart", details: error.message }), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}
