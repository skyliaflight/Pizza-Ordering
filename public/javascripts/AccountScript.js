// DEBUG: Once we update one section, the window.account becomes
// a promise which doesn't seem to get fulfilled.

// Event listener for loading the account page
document.addEventListener("DOMContentLoaded", function(event) {
  $.get("http://localhost:3000/account")
  .then(function(accountPage){
    document.documentElement.innerHTML = accountPage;
  })
  .then(whenAccountPageLoads);
}); // End of event listener for loading of account page

// Script for when account page loads
var whenAccountPageLoads = function(){
  loadLocalCartInfo();
  loadMenuFromServer();

  if(Cookies.getJSON("userCredentials") === undefined){
    $("#login-form").on("click", "#login-btn", loginUser);
  }
  else{
    loadAccountFromServer()
    .then(function(account){
      writeUserInfoToForm(account, document);
      $("#logout-btn").click(logoutUser);

      $("#name-form").on("click", ".update-btn", function(event){
        event.preventDefault();
        window.account = updateAccountName(window.account, $("#name-fields"))
        .then(function(account){
          openAlertBox("Name updated!");
          loadBasicUserInfo();
          return account;
        });
      });

      $("#contact-form").on("click", ".update-btn", function(event){
        event.preventDefault();
        try{
          validPhoneNumber(document.getElementsByName("phone"));
          validEmail(document.getElementsByName("email"));
          window.account = updateAccountContact(window.account, $("#contact-fields"))
          .then(function(account){
            openAlertBox("Contact information updated!");
            return account;
          });
        }
        catch(error){
          openAlertBox(error);
        }
      });

      $("#mailing-address-form").on("click", ".update-btn", function(event){
        event.preventDefault();
        window.account = updateAccountMailingAddr(window.account, $("#mailing-address-fields"))
        .then(function(account){
          openAlertBox("Mailing address updated!");
          return account;
        });
      });

      $("#billing-address-form").on("click", ".update-btn", function(event){
        event.preventDefault();
        window.account = updateAccountBillingAddr(window.account, $("#billing-address-fields"))
        .then(function(account){
          openAlertBox("Billing address updated!");
          return account;
        });
      });

      $("#payment-form").on("click", ".update-btn", function(event){
        event.preventDefault();
        window.account = updateAccountCreditCard(window.account, $("#payment-fields"))
        .then(function(account){
          openAlertBox("Payment information updated!");
          return account;
        });
      });

      $("#password-form").on("click", ".update-btn", function(event){
        event.preventDefault();
        try{
          var passwords = document.getElementsByName("newPassword");
          validPassword(passwords[0].value, passwords[1].value);
          window.account = updateAccountPassword(window.account, passwords[0].value)
          .then(function(account){
            openAlertBox("Password updated!");
            return account;
          });
        }
        catch(error){
          openAlertBox(error);
        }
      });
    });
  }
} // End of script for when account page loads
