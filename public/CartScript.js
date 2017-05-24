
// Event listener for when the cart page loads
document.addEventListener("DOMContentLoaded", function(event) {

  // List items from the cart in the order-summary.
  $.get("http://localhost:3000/cart", function(response) {
    var cart = globalCart;
    var orderSummary = document.getElementsByClassName("order-summary")[0];

    for (var i = 0; i < cart["items"].length; i++) {
      item = cart["items"][i];
      var itemEntry = document.createElement("tr");
      itemEntry.className = "item-entry";

      var dataEntry = document.createElement("td");
      dataEntry.innerHTML = String(item["name"]);
      dataEntry.className = "item-name";
      itemEntry.appendChild(dataEntry);

      dataEntry = document.createElement("td");
      dataEntry.appendChild(createQuantityControls());
      dataEntry.className = "item-quantity-cell";
      dataEntry.querySelector(".quantity-field").innerHTML = String(item["quantity"]);
      itemEntry.appendChild(dataEntry);

      dataEntry = document.createElement("td");
      dataEntry.innerHTML = "$" + String(item["price"]);
      dataEntry.className = "price";
      itemEntry.appendChild(dataEntry);

      orderSummary.appendChild(itemEntry);
    }

    // Create the total price.
    var itemEntry = document.createElement("tr");
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

    orderSummary.appendChild(itemEntry);

    // Add a button to update the cart when the user changes quantities.
    updateButton = document.createElement("div");
    updateButton.innerHTML = "<h3>Update Cart</h3>"
    updateButton.className = "update-btn";
    orderSummary.appendChild(updateButton);

  }); // End of listing items from the cart into the order summary


  // Creates an event listener for the increment buttons.
  $('.order-summary').on('click', '.increment-btn', function(event) {
    var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
    var priceField = this.parentNode.parentNode.parentNode.getElementsByClassName("price")[0];
    var quantity = Number(quantityField.innerHTML);
    var itemName = this.parentNode.parentNode.parentNode.getElementsByClassName("item-name")[0].innerHTML;
    quantity = quantity + 1;

    var index = findCartItem(itemName, globalCart["items"]);

    if (index === -1) {
      alert("Error! User's cart was not up to date with the one retrieved from the server.")
    }

    globalCart["items"][index]["quantity"] = quantity;
    quantityField.innerHTML = String(quantity);

    globalCart["items"][index]["price"] = Number(globalCart["items"][index]["price"]) + Number(globalCart["items"][index]["unitPrice"]);
    priceField.innerHTML = "$" + globalCart["items"][index]["price"];

    globalCart["totalPrice"] = Number(globalCart["totalPrice"]) + Number(globalCart["items"][index]["unitPrice"]);
    var totalPriceField = document.querySelector('#total-price');
    totalPriceField.innerHTML = "$" + globalCart["totalPrice"];

    globalCart["totalItems"] = Number(globalCart["totalItems"]) + 1;
    var totalItemField = document.querySelector('#total-items');
    totalItemField.innerHTML = globalCart["totalItems"];

  }); // End of code for incrementing quantity to add

  // Creates an event listener for the decrement buttons.
  $('.order-summary').on('click', '.decrement-btn', function(event) {
    var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
    var priceField = this.parentNode.parentNode.parentNode.getElementsByClassName("price")[0];
    var itemName = this.parentNode.parentNode.parentNode.getElementsByClassName("item-name")[0].innerHTML;
    var quantity = Number(quantityField.innerHTML);

    if (quantity > 0) {
        quantity = quantity - 1;

        var index = findCartItem(itemName, globalCart["items"]);

        if (index === -1) {
          alert("Error! User's cart was not up to date with the one retrieved from the server.")
        }

        globalCart["items"][index]["quantity"] = quantity;
        quantityField.innerHTML = String(quantity);

        globalCart["items"][index]["price"] = Number(globalCart["items"][index]["price"]) - Number(globalCart["items"][index]["unitPrice"]);
        priceField.innerHTML = "$" + globalCart["items"][index]["price"];

        globalCart["totalPrice"] = Number(globalCart["totalPrice"]) - Number(globalCart["items"][index]["unitPrice"]);
        var totalPriceField = document.querySelector('#total-price');
        totalPriceField.innerHTML = "$" + globalCart["totalPrice"];

        globalCart["totalItems"] = Number(globalCart["totalItems"]) - 1;
        var totalItemField = document.querySelector('#total-items');
        totalItemField.innerHTML = globalCart["totalItems"];
    }
  }); // End of code for decrementing quantity to add


  // Update the cart with the current values whenever
  // the user clicks the "Update Cart" button.
  $('.order-summary').on('click', '.update-btn', function() {
    // Put in code to replace the cart on the server.
    $.ajax({
      url: "http://localhost:3000/cart" + globalCart["_id"],
      data: globalCart,
      type: "PATCH",
      dataType: "json"
    });

  }); // End of code for updating cart

}) // End of event listner
