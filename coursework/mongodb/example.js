
const { MongoClient, ServerApiVersion } = require('mongodb');
process.loadEnvFile('.env');
const uri = process.env.CONNECTION_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("sample_airbnb").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        let collection = await client.db("sample_airbnb").collection("listingsAndReviews");

        const pipeline = [
            {
                '$match': {
                    'accommodates': {
                        '$gt': 4
                    }
                }
            },
            {
                '$match': {
                    'price': {
                        '$lt': 500
                    }
                }
            },
            {
                '$match': {
                    'amenities': 'Hair dryer'
                }
            },
            {
                '$sort': {
                    'price': 1
                }
            },
            {
                '$project': {
                    'name': 1,
                    'amenities': 1,
                    'price': 1,
                    'images': 1,
                    'description': 1
                }
            },
            {
                '$limit': 20
            }
        ];

        console.log(await collection.aggregate(pipeline).toArray())

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
