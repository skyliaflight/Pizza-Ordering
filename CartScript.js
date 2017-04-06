
var cart = {"Cheese": {quantity: 3,
                  unitPrice: 4,
                  price: 12,
                  updateQuantity: function(addition) {
                    this.quantity += addition;
                    this.price = this.quantity*this.unitPrice;
                  }
                },
        "Pepperoni": {quantity: 3,
                          unitPrice: 5,
                          price: 15,
                          updateQuantity: function(addition) {
                            this.quantity += addition;
                            this.price = this.quantity*this.unitPrice;
                          }
                        },
        "Mushroom": {quantity: 2,
                          unitPrice: 3,
                          price: 6,
                          updateQuantity: function(addition) {
                            this.quantity += addition;
                            this.price = this.quantity*this.unitPrice;
                          }
                        },
        "Vegetarian Combo": {quantity: 4,
                          unitPrice: 2.5,
                          price: 10,
                          updateQuantity: function(addition) {
                            this.quantity += addition;
                            this.price = this.quantity*this.unitPrice;
                          }
                        }
        }


// Event listener for when the cart page loads
document.addEventListener("DOMContentLoaded", function(event) {
  var totalItems = 0;
  var totalPrice = 0;

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

    totalItems += cart[item]["quantity"];
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

}) // End of event listner
