var server = require("../server.js");
var fs = require("fs");

// console.log(find_user);
// console.log(groups[0].members);
module.exports = function(db, app, ObjectID) {
  // Retrieve all groups
  const groupCollection = db.collection("groups");

  app.get("/groups", function(req, res) {
    groupCollection.find({}).toArray((err, data) => {
      console.log(data[0]);
      res.send(data);
    });
  });

  // Retrieve a specific group by name
  app.post("/getgroupbyname", function(req, res) {

    groupCollection
      .find({ group_name: req.body.groupname })
      .limit(1)
      .toArray((err, docs) => {
        console.log(docs);
        res.send(docs);
      });
  });

  // Remove user from a channel
  app.post("/removeuserchannel", function(req, res) {
    groupCollection.updateOne(
      {
        group_name: req.body.groupname,
        channels: { $elemMatch: { channel_name: req.body.channelname } }
      },
      { $pull: { "channels.$.channel_members": req.body.member } }
    );

    res.send(true);
  });

  // Retrive a specfic channel
  app.post("/channel", function(req, res) {
    var vardata;
    var channelarray = groupCollection
      .find({
        group_name: req.body.groupname,
        channels: { $elemMatch: { channel_name: req.body.channelname } }
      })
      .limit(1)
      .toArray((err, data) => {
        console.log(data[0].channels);

        var find_channel = data[0].channels
          .map(channel => {
            return channel.channel_name;
          })
          .indexOf(req.body.channelname);

        res.send(data[0].channels[find_channel]);
      });
  });

  // Create new group
  app.post("/groups", function(req, res) {
    var new_group = {};

    new_group.group_name = "";
    new_group.group_admin = "";
    new_group.group_assist_1 = "";
    new_group.group_assist_2 = "";
    new_group.channels = [];

    if (!req.body) {
      return res.sendStatus(400);
    }

    console.log(req.body.groupname);

    groupCollection
      .find({ group_name: req.body.groupname })
      .count((err, count) => {
        if (count == 0) {
          new_group.group_name = req.body.groupname;
          new_group.group_admin = req.body.groupadmin;
          new_group.group_assist_1 = req.body.assist1;
          new_group.group_assist_2 = req.body.assist2;
          new_group.members = new Array(req.body.groupadmin);
          if (new_group.group_admin !== new_group.group_assist_1) {
            new_group.members.push(req.body.assist1);
          }
          if (
            new_group.group_assist_2 !== "" &&
            new_group.group_admin !== new_group.group_assist_2
          ) {
            new_group.members.push(req.body.assist2);
          }

          groupCollection.insertOne(new_group, (err, data) => {
            if (err) throw err;
          });
          res.send(true);
        } else {
          res.send(false);
        }
      });
  });

  // Add member to group
  app.post("/addmember", function(req, res) {
    if (!req.body) {
      return res.sendStatus(400);
    }

    var objectID = new ObjectID(req.body.obID);
    console.log(objectID);
    console.log(req.body.groupname);
    groupCollection
      .find({ group_name: req.body.groupname, members: req.body.username })
      .count((err, count) => {
        if (count == 0) {
          groupCollection.updateOne(
            { _id: objectID },
            { $push: { members: req.body.username } },
            (err, data) => {
              res.send(true);
            }
          );
        } else {
          res.send(false);
        }
      });
  });

  // Remove  a group
  app.post("/removegroup", function(req, res) {
    groupCollection.deleteOne(
      { group_name: req.body.groupname },
      (err, docs) => {
        res.send(true);
      }
    );
  });

  // Remove a member from group
  app.post("/removemember", function(req, res) {
    groupCollection.updateOne(
      { group_name: req.body.groupname },
      { $pull: { members: req.body.membername } },
      (err, data) => {
        res.send(true);
      }
    );
  });

  // Create new a channel
  app.post("/channels", function(req, res) {
    console.log(
      groupCollection
        .find({
          group_name: req.body.groupname,
          channels: { channel_name: req.body.channelname }
        })
        .count((err, count) => {
          console.log(count);
        })
    );
    // console.log(groupCollection.find({ channels: { exists: true } }));
    // channel_members_array = new Array(req.body.membername);
    new_channel = {};
    new_channel.channel_name = req.body.channelname;
    new_channel.channel_members = [req.body.member];
    new_channel.channel_message = [];
    groupCollection
      .find({
        group_name: req.body.groupname,
        channels: { $elemMatch: { channel_name: req.body.channelname } }
      })
      .count((err, count) => {
        if (count == 0) {
          // groupCollection.find({ channels: { exists: false } });
          groupCollection.updateOne(
            { group_name: req.body.groupname },
            {
              $push: { channels: new_channel }
            },
            () => {
              console.log(req.body.groupname.channels);
              res.send(true);
            }
          );
        } else {
          res.send(false);
        }
      });
  });

  // Add a group memeber to channel
  app.post("/addUserToChannel", function(req, res) {
    console.log(req.body.channelname);
    console.log(req.body.groupname);
    console.log(req.body.member);

    groupCollection
      .find({
        group_name: req.body.groupname,
        channels: { $elemMatch: { channel_name: req.body.channelname } }
      })
      .toArray((err, data) => {
        console.log(data[0].channels);

        var find_channel = data[0].channels
          .map(channel => {
            return channel.channel_name;
          })
          .indexOf(req.body.channelname);

        // console.log(find_member_1 + " find member 1");
        var find_member = data[0].channels[
          find_channel
        ].channel_members.indexOf(req.body.member);
        console.log(find_member);
        if (find_member == -1) {
          groupCollection.updateOne(
            {
              group_name: req.body.groupname,
              channels: { $elemMatch: { channel_name: req.body.channelname } }
            },
            { $push: { "channels.$.channel_members": req.body.member } }
          );

          res.send(true);
        } else {
          res.send(false);
        }
      });
  });

  // Remove a channel
  app.post("/removechannel", function(req, res) {
   
    groupCollection.updateOne(
      {
        group_name: req.body.groupname
      },
      {
        $pull: {
          channels: { channel_name: req.body.channelname }
        }
      }
    );
  });
};
