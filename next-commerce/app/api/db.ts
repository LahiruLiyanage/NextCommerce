import {MongoClient, Db, ServerApiVersion} from 'mongodb';

let cashedClient: MongoClient | null = null;
let cashedDb: Db | null = null;

export async function connectToDb() {
    if (cashedClient && cashedDb) {
        return {client: cashedClient, db: cashedDb};
    }

    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.nwrcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    cashedClient = client;
    cashedDb = client.db();

    return { client, db: client.db() }
}