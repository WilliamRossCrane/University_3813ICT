module.exports = {
  listen: function(app, PORT) {
    app.listen(PORT, () => {
      var date = new Date();
      var hours = date.getHours();
      var min = date.getMinutes();
      console.log("My Server is starting at: " + hours + ":" + min);
    });
  }
};
