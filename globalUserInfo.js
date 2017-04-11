
// When any page on the website loads, do the following.
document.addEventListener("DOMContentLoaded", function (event) {
  // Get the cart from the server and use that to determine
  // the current total items.
  $.get("http://thiman.me:1337/cart/Rachel", function(response) {
    var cart = response[response.length - 1];
    var cartButton = document.querySelector("#cart-btn");
    cartButton.innerHTML = "<h1>Cart (" + cart["totalItems"] + ")</h1>";
  });

});

// When the server returns cart, we must convert it to a
// format our client-side of the program can read.
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
  }

  return clientCart;
};
