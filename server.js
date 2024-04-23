const http = require('http');
const { MongoClient } = require('mongodb');

// MongoDB connection URL and database name
const mongoURI = "mongodb+srv://Berrios:Jessica@cluster0.xmtm4ms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "CarDB";

// Create a basic HTTP server
const server = http.createServer(async (req, res) => {
    console.log(req.url);
    // Check requested URL path
    if (req.url === '/api/cars') {
        try {
            // Connect to MongoDB
            const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
            await client.connect();

            // Access the db and collection
            const db = client.db(dbName);
            const collection = db.collection('cars');

            // Retrieve car data from MongoDB
            const cars = await collection.find({}).toArray();

            // Close the MongoDB client
            await client.close();

            // Serve JSON data for cars
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(cars));
        } catch (error) {
            console.error('Error fetching car data:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    } else {
        // Return 404 for other routes
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
