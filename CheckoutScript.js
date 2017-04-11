
// Event listener for when the checkout page loads
// Generates the order summary to the right
document.addEventListener("DOMContentLoaded", function(event) {
  // Generate the order summary by getting the items from the cart
  // in the database.
  $.get("http://thiman.me:1337/cart/Rachel", function(response) {
    var cart = serverCartToClientCart(response[0]);
    var orderSummary = document.getElementsByClassName("order-summary")[0];

    // List items from the cart in the order-summary.
    for (var item in cart) {
      if(item != "totalPrice" && item != "totalItems") {
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
      }
    } // End of listing items from the cart

    // Create and display the total price.
    var itemEntry = document.createElement("tr");
    var dataEntry = document.createElement("td");

    dataEntry.innerHTML = "Total";
    dataEntry.className = "total";
    itemEntry.appendChild(dataEntry);

    dataEntry = document.createElement("td");
    dataEntry.innerHTML = String(cart["totalItems"]);
    itemEntry.appendChild(dataEntry);

    dataEntry = document.createElement("td");
    dataEntry.innerHTML = "$" + String(cart["totalPrice"]);
    dataEntry.className = "total price";
    itemEntry.appendChild(dataEntry);

    orderSummary.appendChild(itemEntry);
    // End of creating total price
  });

  // Copy delivery address to billing address when the user clicks
  // the right checkbox.
  var copyAddrBox = document.getElementsByName("sameAsDeliveryAddr")[0];

  copyAddrBox.addEventListener("change", function (event) {
    var streetAddresses = document.getElementsByName("streetaddress");
    var cities = document.getElementsByName("city");
    var zipCodes = document.getElementsByName("zipcode");

    if (copyAddrBox.checked == true) {
      streetAddresses[1].value = streetAddresses[0].value;
      cities[1].value = cities[0].value;
      zipCodes[1].value = zipCodes[0].value;
    }
    else {
      streetAddresses[1].value = "";
      cities[1].value = "";
      zipCodes[1].value = "";
    }

  }); // End of copying delivery address to billing address

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
    };  // End of function for matching

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

  }); // End of Submit Button event listner

}) // End of event listner
