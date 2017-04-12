// Takes the items stored in the cart and displays them to the page
// which includes the checkout options.

// Event listener for when the cart page loads
document.addEventListener("DOMContentLoaded", function(event) {

  // List items from the cart in the order-summary.
  $.get("http://thiman.me:1337/cart/Rachel", function(response) {
    var cart = serverCartToClientCart(response[response.length - 1]);
    var orderSummary = document.getElementsByClassName("order-summary")[0];

    for (var item in cart) {
      if(item != "totalItems" && item != "totalPrice") {
        var itemEntry = document.createElement("tr");

        var dataEntry = document.createElement("td");
        dataEntry.innerHTML = String(item);
        dataEntry.className = "item-name";
        itemEntry.appendChild(dataEntry);

        dataEntry = document.createElement("td");
        dataEntry.appendChild(createQuantityControls());
        dataEntry.className = "item-quantity-cell";
        dataEntry.querySelector(".quantity-field").innerHTML = String(cart[item]["quantity"]);
        itemEntry.appendChild(dataEntry);

        dataEntry = document.createElement("td");
        dataEntry.innerHTML = "$" + String(cart[item]["price"]);
        dataEntry.className = "price";
        itemEntry.appendChild(dataEntry);

        orderSummary.appendChild(itemEntry);
      }
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
    var quantity = Number(quantityField.innerHTML);
    quantity = quantity + 1;
    quantityField.innerHTML = String(quantity);
  }); // End of code for incrementing quantity to add

  // Creates an event listener for the decrement buttons.
  $('.order-summary').on('click', '.decrement-btn', function(event) {
    var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
    var quantity = Number(quantityField.innerHTML);

    if (quantity > 0) {
        quantity = quantity - 1;
        quantityField.innerHTML = String(quantity);
    }
  }); // End of code for decrementing quantity to add

}) // End of event listner
