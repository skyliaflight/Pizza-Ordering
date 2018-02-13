
var createMenuEntry = function(item) {
  var entrySpace = document.createElement("div");
  entrySpace.className = "menu-item";

  var entryName = document.createElement("h1");
  entryName.className = "entry-name";
  entryName.innerHTML = item["name"];
  entrySpace.appendChild(entryName);

  var entryImage = document.createElement("img");
  entryImage.src = item["photo"];
  entrySpace.appendChild(entryImage);

  var price = document.createElement("h2");
  price.className = "price-tag";
  price.innerHTML = "$" + String(item["price"]);
  entrySpace.appendChild(price);

  entrySpace.appendChild(createQuantityControls());

  var addButton = document.createElement("button");
  addButton.className = "add-btn";
  addButton.id = item["_id"];
  addButton.innerHTML = "<h1>Add to Cart</h1>";
  entrySpace.appendChild(addButton);

  return entrySpace;
} // End of function for generating menu entry html code

// A function which generates increment and decrement controls.
var createQuantityControls = function() {
  var quantityControls = document.createElement("div");
  quantityControls.className = "inc-dec-input";

  var decrementButton = document.createElement("div");
  decrementButton.className = "decrement-btn";
  decrementButton.innerHTML = "-";
  quantityControls.appendChild(decrementButton);

  var quantityField = document.createElement("div");
  quantityField.className = "quantity-field";
  quantityField.innerHTML = "0";
  quantityControls.appendChild(quantityField);

  var incrementButton = document.createElement("div");
  incrementButton.className = "increment-btn";
  incrementButton.innerHTML = "+";
  quantityControls.appendChild(incrementButton);

  return quantityControls;

} // End of function for generating quantity control

var summarizeOrderTotal = function(cart, tableOfOrders){
  // Create the total price.
  var itemEntry = document.createElement("tr");
  itemEntry.id = "total-row";
  var dataEntry = document.createElement("td");

  dataEntry.innerHTML = "Total";
  dataEntry.className = "total";
  itemEntry.appendChild(dataEntry);

  dataEntry = document.createElement("td");
  dataEntry.innerHTML = cart["totalItems"];
  dataEntry.id = "total-items";
  dataEntry.className = "total";
  itemEntry.appendChild(dataEntry);

  dataEntry = document.createElement("td");
  dataEntry.innerHTML = "$" + cart["totalPrice"];
  dataEntry.className = "total price";
  dataEntry.id = "total-price";
  itemEntry.appendChild(dataEntry);

  tableOfOrders.appendChild(itemEntry);
}

var summarizeOrder = function(cart, tableOfOrders, includeQuantityControls){
  if(cart["totalItems"] > 0){
    for (var i = 0; i < cart["items"].length; i++) {
      item = cart["items"][i];
      var itemEntry = document.createElement("tr");
      itemEntry.className = "item-entry";
      itemEntry.id = item["_id"];

      var dataEntry = document.createElement("td");
      dataEntry.innerHTML = String(item["name"]);
      dataEntry.className = "item-name";
      itemEntry.appendChild(dataEntry);

      dataEntry = document.createElement("td");
      dataEntry.className = "item-quantity-cell";
      itemEntry.appendChild(dataEntry);

      if(includeQuantityControls === true){
        dataEntry.appendChild(createQuantityControls());
        dataEntry.querySelector(".quantity-field").innerHTML = String(item["quantity"]);
      }
      else{
        dataEntry.innerHTML = String(item["quantity"]);
      }

      dataEntry = document.createElement("td");
      dataEntry.innerHTML = "$" + String(item["price"]);
      dataEntry.className = "price";
      itemEntry.appendChild(dataEntry);

      tableOfOrders.appendChild(itemEntry);
    }

    summarizeOrderTotal(cart, tableOfOrders);
  }
  else{
    tableOfOrders.innerHTML = "<h1>Your cart is empty...</h1";
  }
}

var updateCartEntryDisplay = function(itemCartIndex){
  // Stop displaying the item in the cart and on the screen if the item's quantity reached 0.
  if(window.globalCart["items"][itemCartIndex]["quantity"] === 0){
    var itemEntry = $("#" + window.globalCart["items"][itemCartIndex]["_id"]);

    /*$.ajax({url: "http://localhost:3000/cart/" + window.globalCart["items"][itemCartIndex]["_id"],
          data: window.globalCart["items"][itemCartIndex],
          type: "DELETE",
          dataType: "json"});

    window.globalCart["items"].splice(itemCartIndex, 1);*/
    itemEntry.remove();
  }
  // Otherwise, just update the display.
  else{
    var itemEntry = $("#" + window.globalCart["items"][itemCartIndex]["_id"]);
    itemEntry.find('.quantity-field')[0].innerHTML = String(window.globalCart["items"][itemCartIndex]["quantity"]);
    itemEntry.find('.price')[0].innerHTML = "$" + window.globalCart["items"][itemCartIndex]["price"];
  }
}
