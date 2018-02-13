
var createAccount = function(doc){
  return $.post("http://localhost:3000/account", {
    firstName: doc.getElementsByName("firstname")[0].value,
    lastName: doc.getElementsByName("lastname")[0].value,
    phone: doc.getElementsByName("phone")[0].value,
    email: doc.getElementsByName("email")[0].value,
    mailingAddressId: "0",
    billingAddressId: "0",
    creditCardId: "0",
    password: doc.getElementsByName("password")[0].value
  })
  .then(function(account){
    if(account["error"]) {throw account["error"];}
    else {return updateAccountMailingAddr(account, $("#mailing-address-fields"))};
  })
  .then(function(account){
    if(account["error"]) {throw account["error"];}
    else {return updateAccountBillingAddr(account, $("#billing-address-fields"))};
  })
  .then(function(account){
    if(account["error"]) {throw account["error"];}
    else {return updateAccountCreditCard(account, $("#payment-fields"))};
  });
};  // End of createAccount

var updateAccount = function(account, doc){
  account["firstName"] = doc.getElementsByName("firstname")[0].value;
  account["lastName"] = doc.getElementsByName("lastname")[0].value;
  account["phone"] = doc.getElementsByName("phone")[0].value;
  account["email"] = doc.getElementsByName("email")[0].value;

  return $.ajax({url: "http://localhost:3000/account",
                 data: account,
                 type: "PATCH",
                 dataType: "json"})
  .then(function(account){
    if(account["error"]) {throw account["error"];}
    else {return updateAccountMailingAddr(account, $("#mailing-address-fields"))};
  })
  .then(function(account){
    if(account["error"]) {throw account["error"];}
    else {return updateAccountBillingAddr(account, $("#billing-address-fields"))};
  })
  .then(function(account){
    if(account["error"]) {throw account["error"];}
    else {return updateAccountCreditCard(account, $("#payment-fields"))};
  });
};  // End of updateAccount

// Script for logging in user
var loginUser = function(event){
  event.preventDefault();
  var userCredentials = {email: this.parentNode.getElementsByClassName("email-field")[0].value,
                         password: this.parentNode.getElementsByClassName("password-field")[0].value};

  $.get("http://localhost:3000/account/login?" + $.param(userCredentials))
  .then(function(accountInfoPage){
    document.location.reload();
  });
} // End of script for logging in user

// Script for logging out user
var logoutUser = function(){
  //Cookies.remove("account");
  Cookies.remove("userCredentials");
  Cookies.remove("user");
  window.account = undefined;
  window.location.reload();
} // End of script for logging out user

var updateAccountName = function(account, form){
  account["firstName"] = form.children(".first-name-field")[0].value;
  account["lastName"] = form.children(".last-name-field")[0].value;

  return $.ajax({url: "http://localhost:3000/account",
                 data: account,
                 type: "PATCH",
                 dataType: "json"});
}

var updateAccountContact = function(account, form){
  account["phone"] = form.children(".phone-field")[0].value;
  account["email"] = form.children(".email-field")[0].value;

  return $.ajax({url: "http://localhost:3000/account",
                 data: account,
                 type: "PATCH",
                 dataType: "json"});
}

// Reads the new address information and updates the account.
// The "form" variable should be a jquery id wrapper.
var updateAccountMailingAddr = function(account, form){
  return readAddress(form)
  .then(function(mailingAddr){
    account["mailingAddressId"] = mailingAddr["_id"];

    return $.ajax({
      url: "http://localhost:3000/account",
      data: account,
      type: "PATCH",
      datatype: "json"
    });
  });
} // End of updateAccountMailingAddr

// Reads the new address information and updates the account.
// The "form" variable should be a jquery id wrapper.
var updateAccountBillingAddr = function(account, form){
  return readAddress(form)
  .then(function(billingAddr){
    account["billingAddressId"] = billingAddr["_id"];

    return $.ajax({
      url: "http://localhost:3000/account",
      data: account,
      type: "PATCH",
      datatype: "json"
    });
  });
} // End of updateAccountBillingAddr

// Reads the new credit card information and updates the account.
// The "form" variable should be a jquery id wrapper.
var updateAccountCreditCard = function(account, form){
  return readCreditCard(form)
  .then(function(creditCardId){
    account["creditCardId"] = creditCardId;

    return $.ajax({
      url: "http://localhost:3000/account",
      data: account,
      type: "PATCH",
      datatype: "json"
    });
  });
} // End of updateAccountCreditCard

// Updates the account password, given a form that
// contains a field for the old password and two
// fields for the new password.
var updateAccountPassword = function(account, password){
  account["password"] = password;
  return $.ajax({url: "http://localhost:3000/account/changePassword",
                 data: account,
                 type: "PATCH",
                 dataType: "json"});
}

// Reads the address from "form" which should be
// a jquery id wrapper.
var readAddress = function(form){
  var billingAddress = {
    streetAddress: form.children(".streetaddress-field")[0].value,
    city: form.children(".city-field")[0].value,
    zipCode: form.children(".zipcode-field")[0].value
  };

  return $.post("http://localhost:3000/address", billingAddress);
} // End of readAddress

// ADD: Include encryption, as we are reading sensitive information.
// Reads and stores the credit card information entered in a document.
// The "form" variable should be a jquery id wrapper.
var readCreditCard = function(form){
  var creditCard = {
    type: form.children(".payment-method-selector")[0].value,
    name: form.children(".cardholder-field")[0].value,
    cardNumber: form.children(".cardnumber-field")[0].value,
    expirationDate: form.children(".expirationdate-field")[0].value,
    securityCode: form.children(".securitycode-field")[0].value
  };

  return $.post("http://localhost:3000/creditCard", creditCard)
  .then(function(json){
    return json["_id"];
  });
};  // End of readCreditCard

// Inserts and address into a form
var writeAddressToForm = function(address, form){
  form.children(".streetaddress-field")[0].value = address.streetAddress;
  form.children(".city-field")[0].value = address.city;
  form.children(".zipcode-field")[0].value = address.zipCode;
} // End of writeAddressToForm

var writeCreditCardToForm = function(creditCard, form){
  form.children(".payment-method-selector")[0].value = creditCard.type;
  form.children(".cardholder-field")[0].value = creditCard.name;
  form.children(".cardnumber-field")[0].value = creditCard.cardNumber;
  form.children(".expirationdate-field")[0].value = creditCard.expirationDate;
  form.children(".securitycode-field")[0].value = creditCard.securityCode;
}

// Write the necessary information from this account to the fields in the document
var writeUserInfoToForm = function(account, doc){
  $.get("http://localhost:3000/address/" + window.account.mailingAddressId)
  .then(function(mailingAddresses){
    writeAddressToForm(mailingAddresses[0], $("#mailing-address-fields"));
  });
  $.get("http://localhost:3000/address/" + window.account.billingAddressId)
  .then(function(billingAddresses){
    writeAddressToForm(billingAddresses[0], $("#billing-address-fields"));
  });
  if(window.account.creditCardId != "0"){
    $.get("http://localhost:3000/creditCard/" + window.account.creditCardId)
    .then(function(creditCards){
      writeCreditCardToForm(creditCards[0], $("#payment-fields"));
    });
  }

  doc.getElementsByName("firstname")[0].value = window.account.firstName;
  doc.getElementsByName("lastname")[0].value = window.account.lastName;
  doc.getElementsByName("phone")[0].value = window.account.phone;
  doc.getElementsByName("email")[0].value = window.account.email;
} // End of writeCheckoutInfoToForm
