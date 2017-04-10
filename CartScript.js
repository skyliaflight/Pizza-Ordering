// Takes the items stored in the cart and displays them to the page
// which includes the checkout options.

// Event listener for when the cart page loads
document.addEventListener("DOMContentLoaded", function(event) {
  //var cartButton = document.querySelector("#cart-btn");
  //var totalItems = 0;

  // List items from the cart in the order-summary.
  $.get("http://thiman.me:1337/cart/Rachel", function(response) {
    var cart = response[response.length - 1];

    var orderSummary = document.getElementsByClassName("order-summary")[0];

    for (var item in cart) {
      var itemEntry = document.createElement("tr");

      var dataEntry = document.createElement("td");
      dataEntry.innerHTML = String(item);
      dataEntry.className = "item-name";
      itemEntry.appendChild(dataEntry);

      dataEntry = document.createElement("td");
      dataEntry.innerHTML = String(cart[item]["quantity"]);
      itemEntry.appendChild(dataEntry);

      dataEntry = document.createElement("td");
      dataEntry.innerHTML = "$" + String(cart[item]["price"]);
      dataEntry.className = "price";
      itemEntry.appendChild(dataEntry);

      orderSummary.appendChild(itemEntry);

      totalPrice += cart[item]["price"];
    }

    // Create the total price.
    var itemEntry = document.createElement("tr");
    var dataEntry = document.createElement("td");

    dataEntry.innerHTML = "Total";
    dataEntry.className = "total";
    itemEntry.appendChild(dataEntry);

    dataEntry = document.createElement("td");
    dataEntry.innerHTML = String(totalItems);
    itemEntry.appendChild(dataEntry);

    dataEntry = document.createElement("td");
    dataEntry.innerHTML = "$" + String(totalPrice);
    dataEntry.className = "total price";
    itemEntry.appendChild(dataEntry);

    orderSummary.appendChild(itemEntry);

  });

  //cartButton.innerHTML = "<h1>Cart (" + totalItems + ")</h1>";

}) // End of event listner
