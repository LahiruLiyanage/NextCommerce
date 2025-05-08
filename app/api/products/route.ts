import { NextRequest } from 'next/server';
import { connectToDb } from "@/app/api/db";

export async function GET(request: NextRequest) {
    try {
        const { db } = await connectToDb();

        // Add actual timeout to prevent hanging requests
        const queryOptions = {
            maxTimeMS: 10000 // 10 second timeout
        };

        // Add pagination to limit the number of products returned
        const limit = 100; // Adjust based on your needs

        const products = await db.collection('products')
            .find({}, queryOptions)
            .limit(limit)
            .toArray();

        if (!products || products.length === 0) {
            return new Response(JSON.stringify({ message: 'No products found' }), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                'content-type': 'application/json',
                'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' // Add caching
            },
        });
    } catch (error) {
        console.error('Database connection error:', error);

        // More detailed error logging
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }

        return new Response(JSON.stringify({
            error: 'Failed to fetch products',
            message: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}