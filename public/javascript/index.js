function searchDatabase(name, obj) {
  var nameSplit = name.split(/\s+/g);
  var firstName = nameSplit[0];
  var lastName = nameSplit[1];

  var employee = obj.filter(object => object.first_name === firstName 
    && object.last_name === lastName)
    return employee[0];
}

exports.searchDatabase = searchDatabase;