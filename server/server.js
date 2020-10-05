var express = require("express");
var nodemon = require("nodemon");
var app = express();
var path = require("path");
var cors = require("cors");

var fs = require("fs");

const formidable = require("formidable");
var http = require("http").Server(app);
const PORT = 3000;

// SOCKET.IO
var io = require("socket.io")(http);
var sockets = require("./socket.js");
//----------------------
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());

// var admin_user = {
//   email: "a-user@mail.com",
//   username: "Super Admin A",
//   password: "123a",
//   isSuperAdmin: true,
//   isGroupAdmin: true,
//   valid: ""
// };

// listen.js
const listen = require("../server/routes/listen.js");
listen.listen(http, PORT);

// MongoDB
const MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017";
MongoClient.connect(
  url,
  { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    if (err) {
      return console.log(err);
    }

    const db = client.db("assignment1database");
    require("./routes/auth-routes.js")(db, app, formidable);
    require("./routes/group-routes.js")(db, app, ObjectID);
    sockets.connect(io, PORT, db);
  }
);
