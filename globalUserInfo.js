// Cart object contains menu item names paired with quantities.
/*var cart = {};*/
// Track the total number of items next to the cart button.
var totalItems = 12;
var totalPrice = 0;
var cartButton;

document.addEventListener("DOMContentLoaded", function (event) {
  cartButton = document.querySelector("#cart-btn");
  cartButton.innerHTML = "<h1>Cart(" + totalItems + ")</h1>";
})

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
