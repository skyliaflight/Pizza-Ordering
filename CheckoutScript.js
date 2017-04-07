var formAction = function() {
  console.log("The form was submitted.");
}

// Event listener for when the checkout page loads
// Generates the order summary to the right
document.addEventListener("DOMContentLoaded", function(event) {
  // List items from the cart in the order-summary.
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

    //totalItems += cart[item]["quantity"];
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

  cartButton.innerHTML = "<h1>Cart (" + totalItems + ")</h1>";

}) // End of event listner
