window.account;
window.globalCart;
var menuKeys = [];
var menu = [];

var loadLocalCartInfo = function(){
  window.globalCart = Cookies.getJSON("globalCart");

  if(window.globalCart == undefined){
    Cookies.set("globalCart", {totalItems: 0, totalPrice: 0.0, items: []});
    window.globalCart = Cookies.getJSON("globalCart");
  }

  $("#cart-btn").html("<h1>Cart (" + window.globalCart["totalItems"] + ")</h1>");
}

var loadMenuFromServer = function(){
  $.get("http://localhost:3000/menu", function(response) {
    var menuItems = response;
    for (var i = 0; i < menuItems.length; i++) {
      menuKeys.push(menuItems[i]["_id"]);
      menu.push({ name: menuItems[i]["name"],
                  price: menuItems[i]["price"],
                  photo: menuItems[i]["photo"]});
    }
  });
}

// Script for loading the minimal user information to the page
var loadBasicUserInfo = function(){
  var user = Cookies.get("user");
  if(user !== undefined){
    $("#account-btn").html("<h1>Hello, " + user + "!</h1>");
  }
} // End of script

// Script for loading the account from the server
var loadAccountFromServer = function(){
  var userCredentials = Cookies.getJSON("userCredentials");

  if(userCredentials !== undefined){
    return $.get("http://localhost:3000/account/info?" + $.param(userCredentials))
    .then(function(account){
      window.account = account;
      return window.account;
    });
  }
} // End of script for loading the account from the server

var openAlertBox = function(text){
  var alertBox = document.createElement("div");
  var okButton = document.createElement("button");
  alertBox.className = "alert-box";
  alertBox.innerHTML = "<p>" + text + "</p>";
  okButton.innerHTML = "Ok";
  okButton.addEventListener("click", function(event){
    closeAlertBox(event.target.parentNode);
  });
  alertBox.appendChild(okButton);
  document.getElementsByTagName("body")[0].appendChild(alertBox);
}

var closeAlertBox = function(alertBox){
  alertBox.parentNode.removeChild(alertBox);
}
