import { NextRequest } from 'next/server';
import { connectToDb } from "../../db";
import { ObjectId } from 'mongodb';

type Params = {
    id: string;
}

export async function GET(request: NextRequest, context: { params: Params | Promise<Params> }) {
    try {
        const { db } = await connectToDb();

        // Handle params regardless of whether it's a Promise or not
        const resolvedParams = context.params instanceof Promise ? await context.params : context.params;
        const productId = resolvedParams.id;

        // Try to find by string ID first
        let product = await db.collection('products').findOne({ id: productId });

        // If not found, try with ObjectId (if it looks like a valid ObjectId)
        if (!product && ObjectId.isValid(productId)) {
            product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
        }

        if (!product) {
            return new Response(JSON.stringify({ message: 'Product not found' }), {
                status: 404,
                headers: { 'content-type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching product:', error);

        // More detailed error logging
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }

        return new Response(JSON.stringify({
            error: 'Failed to fetch product',
            message: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}