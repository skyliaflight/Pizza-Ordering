// Takes the items stored in the cart and displays them to the page
// which includes the checkout options.
var globalCart;

// When any page on the website loads, do the following.
document.addEventListener("DOMContentLoaded", function (event) {
  // Get the cart from the server and use that to determine
  // the current total items.
  $.get("http://localhost:3000/cart", function(response) {
    globalCart = response[response.length - 1];
    var cartButton = document.querySelector("#cart-btn");
    cartButton.innerHTML = "<h1>Cart (" + globalCart["totalItems"] + ")</h1>";
  });

});

// Searches the cart's array of items for an
// item with the given name. Returns its index
// if applicable. Returns -1 otherwise.
var findCartItem = function(itemName, cartArray){
  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i]["name"] === itemName){
      return i;
    }
  }

  return -1;
}

// When the server returns cart, we must convert it to a
// format our client-side of the program can read
// for easy of generating the menu and summaries.
var serverCartToClientCart = function(serverCart) {
  var clientCart = {}

  // Go through the attributes in the server's cart.
  for(serverItem in serverCart) {
    // If the attribute is totalPrice or totalItems, copy it to the new cart.
    if(serverItem === "totalPrice" || serverItem === "totalItems") {
      clientCart[serverItem] = serverCart[serverItem];
    }

    // If the attribute name contains "[quantity]", "[price]", or "[unitPrice]",
    // copy the attribute to the appropriate nested object.
    var serverItemMatch = serverItem.match("quantity|unitPrice|price");

    if(serverItemMatch != null) {
      var clientItemAttribute = serverItemMatch[0];
      var clientItem = serverItem.substring(0, serverItem.indexOf(clientItemAttribute)-1);
      //clientItemAttribute = clientItemAttribute.substring(1, clientItemAttribute.length);

      if(clientCart.hasOwnProperty(clientItem)) {
        clientCart[clientItem][clientItemAttribute] = serverCart[serverItem];
      }
      else {
        clientCart[clientItem] = {};
        clientCart[clientItem][clientItemAttribute] = serverCart[serverItem];
      }
    }

  } // End of looping through the items in the serverCart

  return clientCart;
};  // End of serverCartToClientCart
