module.exports = {
  connect: function(io, PORT, db) {
    const chat = io.of("/chat");

    var socketRoom = [];
    const groupCollection = db.collection("groups");

    io.on("connection", socket => {
      // Receive message from user sending to server
      socket.on("message", data => {
        console.log(data);

        // find the right socket room to send the message
        for (i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            const id = i;
            var message_list = new Array();
            var new_message = {};
            new_message.username = data.username;
            new_message.message = data.message;
            new_message.image = data.image;
            new_message.sendingImage = data.sendingImage;

            // store the message in database
            groupCollection.updateOne(
              {
                group_name: data.group,
                channels: { $elemMatch: { channel_name: data.channel } }
              },
              { $push: { "channels.$.channel_message": new_message } },
              () => {
                groupCollection
                  .find({
                    group_name: data.group,
                    channels: { $elemMatch: { channel_name: data.channel } }
                  })
                  .toArray((err, res) => {
                    var find_channel = res[0].channels
                      .map(channel => {
                        return channel.channel_name;
                      })
                      .indexOf(data.channel);

                    // emit the message to the angular side
                    io.to(socketRoom[id][1]).emit(
                      "message",
                      res[0].channels[find_channel].channel_message
                    );
                  });
              }
            );
            console.log("done saving");
          }
        }

        // io.emit("message", message);
      });

      // join a user in the channel
      socket.on("joinChannel", channel => {
        socket.join(channel, () => {
          socketRoom.push([socket.id, channel]);
          console.log(socketRoom);
          var date = new Date();
          var h = date.getHours();
          var m = date.getMinutes();
          io.in(channel).emit(
            "notice",
            "A new user has joined the channel at: " + h + ":" + m
          );
        });
      });

      // disconnect a user from a room
      socket.on("leaveChannel", channel => {
        console.log(socketRoom);
        for (i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            io.to(channel).emit(
              "notice",
              "A user has left the channel at: " + h + ":" + m
            );

            socketRoom.splice(i, 1);

            console.log(socketRoom);
            socket.leave(channel);
          }
        }
      });
    });
  }
};
