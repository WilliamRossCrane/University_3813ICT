var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let shoud = chai.should();
let url = "http://localhost:3000";
chai.use(chaiHttp);

describe("Route test", () => {
  before(() => {
    console.log("Begin auth-routes test");
  });

  after(() => {
    console.log("End auth-routes test");
  });

  describe("Test route for auth-routes.js", () => {
    describe("/getusers route", () => {
      it("test /getusers route 1", () => {
        chai
          .request(url)
          .get("/getusers")
          .end((err, res) => {
            res.should.have.status(200);
          });
      });

      it("test /getusers route 2", () => {
        chai
          .request(url)
          .get("/getusers")
          .end((err, res) => {
            res.body.should.be.a("array");
          });
      });
    });

    // /api/register
    // -------------------------------------
    describe("/api/register route for register", () => {
      it("test /api/register route 2, expect to be failed ", () => {
        chai
          .request(url)
          .post("/api/register")
          .send({
            email: "a-user@mail.com",
            password: "123a",
            username: "Super User A",
            isSuperAdmin: true,
            isGroupAdmin: true
          })
          .end((err, res) => {
            res.body.should.be.a("boolean");
            res.body.should.equal(false);
          });
      });
    });

    // /api/auth
    // ----------------------------------------------
    describe("/api/auth route for login", () => {
      it("test /api/auth route 1, expect to be successed ", () => {
        chai
          .request(url)
          .post("/api/auth")
          .send({ email: "a-user@mail.com", password: "123a" })
          .end((err, res) => {
            res.should.have.status(200);
          });
      });

      it("test /api/auth route 2, expect to be failed ", () => {
        chai
          .request(url)
          .post("/api/auth")
          .send({ email: "somerandomeemail@mail.com", password: "123a" })
          .end((err, res) => {
            res.body.should.be.a("boolean");
          });
      });
    });

    // /api/delete
    // ----------------------------------------------
    describe("/api/delete route for login", () => {
      it("test /api/delete route 1, expect to be successed ", () => {
        chai
          .request(url)
          .post("/api/delete")
          .send({ email: "sample@mail.com" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");
          });
      });
    });
  });
});

describe("Test for group-routes", () => {
  before(() => {
    console.log("Begin group-routes test");
  });

  after(() => {
    console.log("End group-routes test");
  });

  describe("Test route for group-routes.js", () => {
    describe("Test group", () => {
      it("/groups route 1", () => {
        chai
          .request(url)
          .get("/groups")
          .end((err, res) => {
            res.body.should.be.a("array");
          });
      });

      it("/getgroupbyname route", () => {
        chai
          .request(url)
          .post("/getgroupbyname")
          .send({ groupname: "mmmm" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
          });
      });

      describe("Create group /groups post", () => {
        it("create group /group, expected to be failed", () => {
          chai
            .request(url)
            .post("/groups")
            .send({
              groupname: "mmmm",
              groupadmin: "Super User A",
              assist1: "Super User A",
              assist2: ""
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("boolean");
              res.body.should.equal(false);
            });
        });
      });

      it("Test should delete group /removegroup", () => {
        chai
          .request(url)
          .post("/removegroup")
          .send({ groupname: "as" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("boolean");
            res.body.should.equal(true);
          });
      });

      describe("Test add and remove member in group", () => {
        it("should add member in group, expected to be successed", () => {
          chai
            .request(url)
            .post("/addmember")
            .send({ groupname: "mmmm", username: "testusername" })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("boolean");
              res.body.should.equal(true);
            });
        });

        it("should add member in group, expected to be failed", () => {
          chai
            .request(url)
            .post("/addmember")
            .send({ groupname: "mmmm", username: "Super Admin A" })
            .end((err, res) => {
              res.body.should.be.a("boolean");
              res.body.should.equal(false);
            });
        });

        it("should remove member in group, expected to be successed", () => {
          chai
            .request(url)
            .post("/removemember")
            .send({ groupname: "mmmm", membername: "nk213ln" })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("boolean");
            });
        });
      });
    });
  });
});
