var server = require("../server.js");
var fs = require("fs");
var imageName = "";
module.exports = function(db, app, formidable) {
  // retrieve all users
  // db.collection("users").drop();
  const userCollection = db.collection("users");

  // var admin_user = {
  //   email: "a-user@mail.com",
  //   username: "Super Admin A",
  //   password: "123a",
  //   isSuperAdmin: true,
  //   isGroupAdmin: true,
  //   image: "example.png",
  //   valid: ""
  // };

  app.get("/getusers", function(req, res) {
    // using mongodb
    userCollection.find({}).toArray((err, data) => {
      res.send(data);
    });
  });

  // log in handler
  app.post("/api/auth", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var customer = {};
    customer.email = "";
    customer.password = "";
    customer.username = "";
    customer.isSuperAdmin = false;
    customer.isGroupAdmin = false;
    customer.valid = false;

    userCollection
      .find({ email: req.body.email, password: req.body.password })
      .count((err, count) => {
        if (count == 0) {
          console.log("email or password is invalid");
          res.send(false);
        } else {
          userCollection
            .find({ email: req.body.email, password: req.body.password })
            .limit(1)
            .toArray((err, data) => {
              res.send(data);
            });
        }
      });
  });

  // user register handler
  app.post("/api/register", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }
    var customer = {};

    customer.email = "";
    customer.password = "";
    customer.username = "";
    customer.image = "";
    customer.isSuperAdmin = false;
    customer.isGroupAdmin = false;

    userCollection
      .find({
        $or: [{ email: req.body.email }, { username: req.body.username }]
      })
      .count((err, count) => {
        console.log(count);
        if (count == 0) {
          customer.email = req.body.email;
          customer.username = req.body.username;
          customer.password = req.body.password;
          customer.image = req.body.imageregister;
          customer.isSuperAdmin = req.body.isSuperAdmin;
          customer.isGroupAdmin = req.body.isGroupAdmin;
          userCollection.insertOne(customer, (err, dbres) => {
            if (err) throw err;
          });

          res.send(true);
        } else {
          res.send(false);
        }
      });
  });

  // remove user handler
  app.post("/api/delete", function(req, res) {
   
    userCollection.deleteOne({ email: req.body.email }, (err, docs) => {
      res.send(true);
    });
  });

  // Grand super admin role
  app.post("/grandsuper", function(req, res) {
    userCollection.updateOne(
      { email: req.body.email },
      { $set: { isSuperAdmin: true } },
      () => {
        res.send(true);
      }
    );
  });
};
