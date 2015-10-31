function deleteData(dataType, dataId){
    check(dataType, String);
    check(dataId, String);

    if(dataType == "messages"){
        Messages.remove(dataId);
    }

    if(dataType == "photos"){
        Photos.remove(dataId);
    }
}
