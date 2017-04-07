
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
    var phoneNumbers = document.getElementsByName("phone");

    for (var i = 0; i < phoneNumbers.length; i++) {
      var matches = phoneNumbers[i].value.match("[0-9]{10}");
      if (matches == null || matches[0] != phoneNumbers[i].value) {
        alert("Phone number is invalid\nMake sure to include area code")
      }
    }

    // Check the email
    var emails = document.getElementsByName("email");

    for (var i = 0; i < emails.length; i++) {
      var matches = emails[i].value.match("([A-Z]|[a-z]|[0-9])+@[a-z]+\.com");
      if (matches == null || matches[0] != emails[i].value) {
        alert("Invalid email address");
      }
    }

    // Check the addresses
    var streetAddresses = document.getElementsByname("streetaddress");
    
    // Check the payment information
  });

}) // End of event listner
