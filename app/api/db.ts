import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDb() {
    if (cachedClient && cachedDb) {
        // Return cached connection if available
        return { client: cachedClient, db: cachedDb };
    }

    try {
        // const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.nwrcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        const uri = `mongodb+srv://lahaliya:IRSdeC7N76GgZnUs@cluster0.nwrcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            // Add connection timeout
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        // Connect the client to the server
        await client.connect();
        console.log("Successfully connected to MongoDB");

        // Hardcoded database name
        const db = client.db('next-commerce-nextjs');

        // Cache the client and db connections
        cachedClient = client;
        cachedDb = db;

        return { client, db };
    } catch (error) {
        console.error('MongoDB connection error:', error);

        // Log more detailed error information
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                name: error.name,
                stack: error.stack
            });
        }

        throw error; // Always throw the error for proper handling
    }
}