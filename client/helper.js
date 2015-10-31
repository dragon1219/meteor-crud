Template.createData.helpers({

    data: function(){
        return Messages.find({},{sort:{dateCreated:-1}});
    }

});

Template.createData.events({

    "submit .input-data": function(event){
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
        Messages.insert({'text': text, 'dateCreated':new Date()});

      // Clear form
      event.target.text.value = "";
    }

});

Template.createData.events({

    "click .delete":function(){

        Messages.remove(this._id);

    }

});

