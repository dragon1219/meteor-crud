function createData (dataType,data){
    check(dataType,String);

    if(dataType == "messages"){
        Messages.insert({text: data}});
    }

    if(dataType == "photos"){
        Photos.insert({photo: data});
    }
}
