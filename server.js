const express = require("express");
const http = require("http");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://C0MPLX:iVUok9MWXTRCZlSi@testcluster.wi4rn.mongodb.net/?retryWrites=true&w=majority&appName=testCluster";

const app = express();
const server = http.createServer(app);
const port = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('www'));

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//database connection
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
        const db = client.db("stickit");
        const collections = await db.collections();
        const users = db.collection("users");
        // Send a ping to confirm a successful connection
        await client.db("stickit").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch {
        console.log("Failed to connect to MongoDB");
    }
}
run().catch(console.dir);
//database collection users
const users = client.db("stickit").collection("users");

app.post("/board", async (req, res)=>{
    const {username, password} = req.body;
    console.log("received", username, password);

    const user = await users.findOne({username: username});
    if(user == undefined){
        return res.status(400).json({error:"User not found"});
    }

    if(!bcrypt.compareSync(password, user.password)){
        return res.status(400).json({error:"Wrong password"});
    }
    res.sendFile(__dirname + "/www/blankCanvas.html");
});

app.post("/register", async (req, res)=>{
    const {username, password} = req.body;

    console.log("received", username, password);
    //insert user into db.users
    
    if(await users.findOne({username: username}) !== null){
        return res.status(400).json({error:"User already exists"});
    }

    users.insertOne({
        username: username,
        password: bcrypt.hashSync(password, 8)
    });

    res.json({success:true});
});