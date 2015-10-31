//On a server, the function will run as soon as the server process is finished starting.
Meteor.startup(function () {
    // code to run on server at startup

    // server: populate collections with some initial documents
      Messages.insert({text: "Hello world"});
      Photos.insert({name: "Super Bowl Party"});

  });

// server: publish all msg documents
Meteor.publish("messages", function () {
  return Messages.find(); // everything
});

// server: publish all photo documents
Meteor.publish("photos", function () {
  return Messages.find();
});
