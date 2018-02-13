
// Event listener for when the cart page loads
document.addEventListener("DOMContentLoaded", function(event) {
  loadLocalCartInfo();
  loadMenuFromServer();
  loadBasicUserInfo();
  summarizeOrder(window.globalCart, document.getElementsByClassName("order-summary")[0], true);
  var mainSection = $(".main-content");

  if(Cookies.get("userCredentials") != undefined && Cookies.get("userCredentials") != null){
    mainSection.append("<a href=\"Checkout.html\">" +
  	"<button class=\"proceed-btn\"><h3>Checkout</h3></button>" +
  	"</a>");
  }
  else{
    mainSection.append("<a id=\"member-checkout-link\">" +
  	"<button class=\"proceed-btn\"><h3>Checkout as Member</h3></button>" +
  	"</a><br>" +
  	"<a href=\"Checkout.html\">" +
  	"<button class=\"proceed-btn\"><h3>Checkout as Guest</h3></button>" +
  	"</a>");
    $('#member-checkout-link').click(function(event){
      $.get("http://localhost:3000/account")
      .then(function(accountPage){
        document.documentElement.innerHTML = accountPage;
        $("#login-form").on("click", "#login-btn", loginUser);
      })
    });
  }

  // Creates an event listener for the increment buttons.
  $('.order-summary').on('click', '.increment-btn', function(event) {
    var itemId = this.parentNode.parentNode.parentNode.id;
    var index = findCartItem(itemId, window.globalCart["items"]);
    var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
    var newItemQuantity = Number(quantityField.innerHTML) + 1;
    var oldItemQuantity = window.globalCart["items"][index]["quantity"];

    if (index === -1) {
      alert("Error! User's cart was not up to date with the one retrieved from the server.");
    }

    addCartItem(itemId, newItemQuantity-oldItemQuantity);
    updateCartEntryDisplay(index);
    deleteCartItemOfQuantityZero(index);
    $('#total-row').remove();
    summarizeOrderTotal(window.globalCart, $('.order-summary')[0]);
    $("#cart-btn").html("<h1>Cart (" + window.globalCart["totalItems"] + ")</h1>");
  }); // End of code for incrementing quantity to add

  // Creates an event listener for the decrement buttons.
  $('.order-summary').on('click', '.decrement-btn', function(event) {
    var itemId = this.parentNode.parentNode.parentNode.id;
    var index = findCartItem(itemId, window.globalCart["items"]);
    var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
    var newItemQuantity = Number(quantityField.innerHTML) - 1;
    var oldItemQuantity = window.globalCart["items"][index]["quantity"];

    if (index === -1) {
      alert("Error! User's cart was not up to date with the one retrieved from the server.");
    }

    addCartItem(itemId, newItemQuantity-oldItemQuantity);
    updateCartEntryDisplay(index);
    deleteCartItemOfQuantityZero(index);
    $('#total-row').remove();
    summarizeOrderTotal(window.globalCart, $('.order-summary')[0]);
    $("#cart-btn").html("<h1>Cart (" + window.globalCart["totalItems"] + ")</h1>");
  });// End of code for decrementing quantity to add

}) // End of event listner
