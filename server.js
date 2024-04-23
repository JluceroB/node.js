server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');


//MongoDB connection URL and database name
const mongoURI = "mongodb+srv://Berrios:Jessica@cluster0.xmtm4ms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "CarDB";

//create a basic HTTP server
const server = http.createServer(async (req,res) =>{
    console.log(req,url);
    //check requested url path
    if(req.url === '/api/cars'){
        try{
            //connect to mongoDB
            const client = new MongoClient(mongoURI, { useUnifiedTopology: true})
            await client.connect();

            //Access the db and collection
            const db = client.db(dbName);
            const collection = db.collection('cars');

            //retrieve car data from MongoDB
            const cars = await collection.find({}).toArray();

            //close the MongoDB collection
            await client.close();

            //serve JSON data for cars
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify(cars));
        } catch (error){
            console.error('Error fetching car data:'. error);
            res.writeHead(500,{'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        }
    } else{
        //return 404 for other routes
        res.writeHead(404,{'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
    }
});

//start the server
const PORT =process.env.PORT || 3000;
server.listen(PORT,() =>{
    console.log('Server running on port ${PORT}');
});
const { ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Berrios:Jessica@cluster0.xmtm4ms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
