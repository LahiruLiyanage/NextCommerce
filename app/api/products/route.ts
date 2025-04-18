import {connectToDb} from "@/app/api/db";

export async function GET() {
    try {
        const { db } = await connectToDb();
        const products = await db.collection('products').find({}).toArray();

        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}