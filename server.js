const express = require("express");
const http = require("http");
const bcrypt = require("bcryptjs");
const { randomInt } = require("crypto");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const port = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('www'));

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


//test user
const user = { username: "admin", password: "admin" };

app.post("/login", (req, res)=>{
    const {username, password} = req.body;
    console.log(username, password);

    if (username !== user.username || password !== user.password) {
        return res.status(400).json({error:"Wrong Credentials"});
    }
    res.sendFile(__dirname + "/www/blankCanvas.html");
});

app.post("/register", (req, res)=>{
    const {username, password} = req.body;
    console.log(username, password);
    
    res.sendFile(__dirname + "/www/index.html");
});
