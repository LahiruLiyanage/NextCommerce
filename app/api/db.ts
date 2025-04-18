import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let cashedClient: MongoClient | null = null;
let cashedDb: Db | null = null;

export async function connectToDb() {
    if (cashedClient && cashedDb) {
        return {client: cashedClient, db: cashedDb};
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

        cashedClient = client;
        cashedDb = client.db('next-commerce-nextjs');

        return { client, db: client.db('next-commerce-nextjs') };
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
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