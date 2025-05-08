import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDb() {
    if (cachedClient && cachedDb) {
        // Return cached connection if available
        return { client: cachedClient, db: cachedDb };
    }

    try {
        // Use environment variables for credentials
        const uri = `mongodb+srv://lahaliya:IRSdeC7N76GgZnUs@cluster0.nwrcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

        if (!uri) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

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

        // Get database name from environment or use default
        const dbName = process.env.MONGODB_DB || 'next-commerce-nextjs';
        const db = client.db(dbName);

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