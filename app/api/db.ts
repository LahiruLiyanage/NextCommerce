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
            }
        });

        // Connect the client to the server
        await client.connect();
        console.log("Successfully connected to MongoDB");

        const db = client.db('next-commerce-nextjs');

        // Cache the client and db connections
        cachedClient = client;
        cachedDb = db;

        return { client, db };
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // Return a dummy client and db during build time
        if (process.env.NODE_ENV === 'production') {
            return {
                client: {} as MongoClient,
                db: {
                    collection: () => ({
                        find: () => ({ toArray: () => Promise.resolve([]) }),
                        findOne: () => Promise.resolve(null)
                    })
                } as unknown as Db
            };
        }
        throw error;
    }
}