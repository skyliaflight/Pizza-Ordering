
// Event listener for when the checkout page loads
// Generates the order summary to the right
document.addEventListener("DOMContentLoaded", function(event) {
  loadLocalCartInfo();
  loadMenuFromServer();
  loadBasicUserInfo();

  if(Cookies.getJSON("userCredentials") !== undefined){
    loadAccountFromServer()
    .then(function(account){
      writeUserInfoToForm(account, document);
    });
  }
  else{
    newPasswordForm = document.createElement("fieldset");
    newPasswordForm.id = "new-password-form";
    newPasswordForm.innerHTML = "<legend><h2>Create Account</h2></legend>" +
                                "Password<br>" +
                                "<input type=\"password\" name=\"password\"><br>" +
                                "Re-enter Password<br>" +
                                "<input type=\"password\" name=\"password\"><br>";
    $("#place-order-btn").before(newPasswordForm);
  }

  var orderSummary = $(".order-summary")[0];
  summarizeOrder(window.globalCart, orderSummary, false); // Generate the order summary.

  // Copy delivery address to billing address when the user clicks
  // the right checkbox.
  var copyAddrBox = document.getElementsByName("sameAsDeliveryAddr")[0];
  copyAddrBox.addEventListener("change", function (event) {
    var streetAddresses = document.getElementsByName("streetaddress");
    var cities = document.getElementsByName("city");
    var zipCodes = document.getElementsByName("zipcode");

    if (copyAddrBox.checked == true) {
      streetAddresses[1].value = streetAddresses[0].value;
      cities[1].value = cities[0].value;
      zipCodes[1].value = zipCodes[0].value;
    }
    else {
      streetAddresses[1].value = "";
      cities[1].value = "";
      zipCodes[1].value = "";
    }

  }); // End of copying delivery address to billing address

  // Process order when submit button gets clicked.
  $("#place-order-btn").click(function(event){
    event.preventDefault();

    try{
      validateClientInfo(document, Cookies.get("userCredentials"));
      processOrder()
      .then(function(confirmation){
        Cookies.remove("globalCart");
        document.documentElement.innerHTML = confirmation;
        loadBasicUserInfo();
      })
      .catch(function(error){
        openAlertBox("Error: " + error);
      });
    }
    catch(error){
      openAlertBox(error);
    }
  });

}); // End of event listner for when check out page loads
