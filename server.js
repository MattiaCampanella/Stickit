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
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

//test user//
const user = { username: "admin", password: "admin" };

app.post("/board", (req, res)=>{
    const {username, password} = req.body;

    if(username === user.username && password === user.password){ //check if user is admin
        res.sendFile(__dirname + "/www/blankCanvas.html");
    }

    //check users credentials in db.users
    if(db.users.findOne({username: username}) === null){
        return res.status(400).json({error:"User not found"});
    }
    if(!bcrypt.compareSync(password, db.users.findOne({username: username}).password)){
        return res.status(400).json({error:"Wrong password"});
    }
    res.sendFile(__dirname + "/www/blankCanvas.html");
});

app.post("/register", (req, res)=>{
    const {username, password} = req.body;

    //insert user into db.users
    db.users.insertOne({
        username: username,
        password: bcrypt.hashSync(password, 8)
    });

    res.json({success:true});
});


app.post("/register", (req, res)=>{
    const {username, password} = req.body;
    console.log(username, password);
    
    res.sendFile(__dirname + "/www/index.html");
});
