Template.createData.helpers({

    data: function(){
        //return the message that belongs to the current user
        //User Meteor.userId() to get the current logged in user's ID
        return Messages.find({owner:Meteor.userId()},{sort:{dateCreated:-1}});
    }

});

Template.createData.events({

    "submit .input-data": function(event){
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
        Messages.insert({ text: text,
                          dateCreated:new Date(),
                          owner: Meteor.userId(),
                          username: Meteor.user().username});

      // Clear form
      event.target.text.value = "";
    },

    "click .delete":function(){

        Messages.remove(this._id);

    },

    "submit .update-data":function(evet){
          // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
        Messages.update(this._id,{text: text,
                                  dateCreated:new Date(),
                                  owner: Meteor.userId(),                                      username:Meteor.user().username});

      // Clear form
      event.target.text.value = "";
}

});

