// Array of menu items.
var menuItems = [
    {
        name: "Cheese",
        price: 4.00,
        photo: "http://tammybruce.com/wp-content/uploads/2015/08/pizza.png"
    },
    {
        name: "Pepperoni",
        price: 5.00,
        photo: "http://i3.tigernet.com/stories/15/football/pizza.jpg"
    },
    {
        name: "Mushroom",
        price: 3.00,
        photo: "http://static6.depositphotos.com/1004868/639/i/950/depositphotos_6399017-stock-photo-pizza-capricciosa.jpg"
    },
    {
        name: "Vegetarian Combo",
        price: 2.50,
        photo: "http://static7.depositphotos.com/1013693/755/i/950/depositphotos_7556189-stock-photo-pizza-white-background.jpg"
    }
];

var cart = {};


document.addEventListener("DOMContentLoaded", function(event) {
    var totalItems = 0;
    var cartButton = document.querySelector("#cart-btn");
    var incrementButtons = document.querySelectorAll(".increment-btn");
    var decrementButtons = document.querySelectorAll(".decrement-btn");
    var addToCartButtons = document.querySelectorAll(".add-btn");

    // Creates an event listener for the increment buttons.
    for (var i = 0; i < incrementButtons.length; i++) {
        incrementButtons[i].addEventListener("click", function() {
            var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0].getElementsByTagName("p")[0];
            var quantity = Number(quantityField.innerHTML);
            quantity = quantity + 1;
            quantityField.innerHTML = String(quantity);
        })
    }

    // Creates an event listener for the decrement buttons.
    for (var i = 0; i < decrementButtons.length; i++) {
        decrementButtons[i].addEventListener("click", function() {
            var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0].getElementsByTagName("p")[0];
            var quantity = Number(quantityField.innerHTML);

            if (quantity > 0) {
                quantity = quantity - 1;
                quantityField.innerHTML = String(quantity);
            }
        })
    }

    // When an add to cart button is clicked, the quantity in the quantity box should be
    // added to the quantity which the user is buying of this menu item.
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", function() {
            //alert("You clicked.");
            var itemName = this.parentNode.getElementsByClassName("entry-name")[0].innerHTML;
            var addedQuantity = Number(this.parentNode.getElementsByClassName("quantity-field")[0].getElementsByTagName("p")[0].innerHTML);
            //menuItems[itemName]);
            //alert(itemName);
            //alert(Number(this.parentNode.getElementsByClassName("inc-dec-input")[0].getElementsByClassName("quantity-field")[0].getElementsByTagName("p")[0].innerHTML));
            if (cart.hasOwnProperty(itemName)) {
              console.log(cart[itemName]);
              cart[itemName] += addedQuantity;
              console.log(cart[itemName]);
            }
            else {
              cart[itemName] = addedQuantity;
              console.log(cart[itemName]);
            }

        })
    }

});
