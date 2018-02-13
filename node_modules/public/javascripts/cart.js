// Searches the cart's array of items for an
// item with the given id. Returns its index
// if applicable. Returns -1 otherwise.
var findCartItem = function(itemId, cartArray){
  for (var i = 0; i < cartArray.length; i++) {
    if (cartArray[i]["_id"] === itemId){
      return i;
    }
  }

  return -1;
}

// Adds the item to the cart.
var addCartItem = function(_id, addedQuantity){
  var itemCartIndex = findCartItem(_id, window.globalCart["items"]);
  var itemMenuIndex = menuKeys.indexOf(_id);
  var itemName = menu[itemMenuIndex]["name"];
  var itemPrice = menu[itemMenuIndex]["price"];

  // We cannot remove any quantity if it is not in the cart.
  if(addedQuantity < 0 && itemCartIndex === -1){
    return;
  }
  // Don't perform the operation if it causes a negative quantity.
  else if(addedQuantity < 0 && (addedQuantity + Number(window.globalCart["items"][itemCartIndex]["quantity"]) < 0)){
    return;
  }
  // Don't bother doing anything if the added quantity is 0.
  else if(addedQuantity === 0){
    return
  }
  else {
    if (itemCartIndex === -1) {
      window.globalCart["items"].push({_id: _id,
                        name: itemName,
                        quantity: addedQuantity,
                        unitPrice: itemPrice,
                        price: addedQuantity*itemPrice});

      itemCartIndex = findCartItem(_id, window.globalCart["items"]);
    }
    else {
      window.globalCart["items"][itemCartIndex]["quantity"] = Number(window.globalCart["items"][itemCartIndex]["quantity"]) + addedQuantity;
      window.globalCart["items"][itemCartIndex]["price"] = Number(window.globalCart["items"][itemCartIndex]["quantity"])*Number(window.globalCart["items"][itemCartIndex]["unitPrice"]);
    }

    // Update the totals.
    window.globalCart["totalItems"] = Number(window.globalCart["totalItems"]) + addedQuantity;
    var cartButton = document.querySelector("#cart-btn");
    window.globalCart["totalPrice"] = Number(window.globalCart["totalPrice"]) + addedQuantity*itemPrice;
    Cookies.set("globalCart", window.globalCart);
    console.log(window.globalCart);
  }
};  // End of function for adding items to the cart

// Script for deleting a cart entry if its quantity is zero
var deleteCartItemOfQuantityZero = function(itemIndex){
  if(Number(window.globalCart["items"][itemIndex]["quantity"]) === 0){
    window.globalCart["items"].splice(itemIndex, 1);
    Cookies.set("globalCart", window.globalCart);
  }
} // End of script for deleting cart item of quantity zero
