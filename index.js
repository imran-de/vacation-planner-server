const express = require('express')

const { MongoClient } = require("mongodb")
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
//environment variable   
require('dotenv').config()

const app = express();

const port = process.env.PORT || 5000;
//middleware must use
app.use(cors())
app.use(express.json())

// mongo database 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5okll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        const collection = client.db("tour_planner").collection("events");

        // add event 
        app.post('/addEvent', async (req, res) => {
            const data = req.body;
            console.log(data);
            const result = await collection.insertOne(data)
            res.json(result)
        })

        // Get all events
        app.get('/allEvents', async (req, res) => {
            const result = await collection.find({}).toArray();
            res.send(result)
        })

        console.log("Connected successfully to mongodb database");
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Yah! tour planner server running!!")
})

app.listen(port, () => {
    console.log("The server running on port :", port);
})