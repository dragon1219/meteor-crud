function readData(dataType){
    check(dataType, String);

    if(dataType == "messages"){
        return Messages.find().fetch();
    }

    if(dataType == "photos"){
        return Photos.find().fetch();
    }
}
