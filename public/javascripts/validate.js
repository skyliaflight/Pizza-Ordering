
// Script for matching
var matchesExactly = function (text, pattern) {
  var matches = text.match(pattern);
  if (matches == null || matches[0] != text) {
    return false;
  } else {
    return true;
  }
};  // End of script for matching

var validPhoneNumber = function(phoneNumbers){
  for (var i = 0; i < phoneNumbers.length; i++) {
    if(!matchesExactly(phoneNumbers[i].value, "[0-9]{10}")){
      throw "Invalid phone number\nShould have 10 digits";
    }
  }
}

var validEmail = function(emails){
  for (var i = 0; i < emails.length; i++) {
    if(!matchesExactly(emails[i].value, "([A-Z]|[a-z]|[0-9])+@[a-z]+\.com")){
      throw "Invalid email";
    }
  }
}

var validStreetAddress = function(streetAddresses){
  for (var i = 0; i < streetAddresses.length; i++){
    if(!matchesExactly(streetAddresses[i].value, "[0-9]+ ([A-Z]|[a-z]| )+")){
      throw "Invalid street address(es)";
    }
  }
}

var validCity = function(cities){
  for (var i = 0; i < cities.length; i++){
    if(!matchesExactly(cities[i].value, "([A-Z]|[a-z]| )+")){
      throw "Invalid city name(s)";
    }
  }
}

var validZipCode = function(zipCodes){
  for (var i = 0; i < zipCodes.length; i++) {
    if(!matchesExactly(zipCodes[i].value, "[0-9]{5}")){
      throw "Invalid zip code(s)";
    }
  }
}

var validPassword = function(password1, password2){
  if(password1 != password2){
    throw "Passwords do not match";
  }
}

// Validating client information in the form
var validateClientInfo = function(doc, loggedIn){
  validPhoneNumber(doc.getElementsByName("phone"));
  validEmail(doc.getElementsByName("email"));
  validStreetAddress(doc.getElementsByName("streetaddress"));
  validCity(doc.getElementsByName("city"));
  validZipCode(doc.getElementsByName("zipcode"));

  if(!loggedIn){
    var passwords = doc.getElementsByName("password");
    validPassword(passwords[0].value, passwords[1].value);
  }

}   // End of validateClientInfo
