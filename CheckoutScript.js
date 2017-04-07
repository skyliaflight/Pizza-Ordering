
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
    // A function for matching
    var matchesExactly = function (text, pattern) {
      var matches = text.match(pattern);
      if (matches == null || matches[0] != text) {
        return false;
      } else {
        return true;
      }
    };

    // Check the phone number
    var phoneNumbers = document.getElementsByName("phone");
    for (var i = 0; i < phoneNumbers.length; i++) {
      if (!matchesExactly(phoneNumbers[i].value, "[0-9]{10}")) {
        alert("Phone number is invalid\nMake sure to include area code");
      }
    }

    // Check the email
    var emails = document.getElementsByName("email");
    for (var i = 0; i < emails.length; i++) {
      if (!matchesExactly(emails[i].value, "([A-Z]|[a-z]|[0-9])+@[a-z]+\.com")) {
        alert("Invalid email address");
      }
    }

    // Check the addresses
    var streetAddresses = document.getElementsByName("streetaddress");
    for (var i = 0; i < streetAddresses.length; i++) {
      if (!matchesExactly(streetAddresses[i].value, "[0-9]+ ([A-Z]|[a-z]| )+")) {
        alert("Invalid street address(es)");
      }
    }

    var cities = document.getElementsByName("city");
    for (var i = 0; i < cities.length; i++) {
      if (!matchesExactly(cities[i].value, "([A-Z]|[a-z]| )+")) {
        alert("Invalid city name(s)");
      }
    }

    var zipCodes = document.getElementsByName("zipcode");
    for (var i = 0; i < zipCodes.length; i++) {
      if (!matchesExactly(zipCodes[i].value, "[0-9]{5}")) {
        alert("Invalid zipcode");
      }
    }

    // Check the payment information
  });

}) // End of event listner
