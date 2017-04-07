
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

  // Check content when submit button gets clicked.
  var submitButton = this.querySelector("#place-order-btn");

  submitButton.addEventListener("click", function (event) {
    // Check the phone number
    phoneNumbers = document.getElementsByName("phone");

    for (var i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i].value.length === 10) {
        for (var k = 0; k < phoneNumbers[i].value.length; k++) {
          if (!"0123456789".includes(phoneNumbers[i].value[k])) {
            alert("Phone number contains invalid character(s)");
          }
        }
      }
      else {
        alert("Phone number contains an invalid number of characters");
      }
    }

    // Check the email
    // Check the addresses
    // Check the payment information
  });

}) // End of event listner
