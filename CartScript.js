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
    itemEntry.appendChild(dataEntry);

    dataEntry = document.createElement("td");
    dataEntry.innerHTML = "$" + cart["totalPrice"];
    dataEntry.className = "total price";
    itemEntry.appendChild(dataEntry);

    orderSummary.appendChild(itemEntry);

  }); // End of listing items from the cart into the order summary

}) // End of event listner
