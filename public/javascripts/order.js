
var processOrder = function(){
  if(window.account != undefined){
    return updateAccount(window.account, document)
    .then(function(account){
      window.account = account;
      return window.account;
    })
    .then(postOrderedItemsToAccount);
  }
  else{
    return createAccount(document)
    .then(function(account){
      window.account = account;
      Cookies.set("userCredentials", JSON.stringify({email: account.email, password: document.getElementsByName("password")[0].value}));
      return window.account;
    })
    .then(postOrderedItemsToAccount);
  }
}

var postOrderedItemsToAccount = function(account){
  for(var i = 0; i < window.globalCart["items"].length; i++){
    processOrderedItem(account["_id"], window.globalCart["items"][i]);
  }

  return $.get("http://localhost:3000/confirmation?" + $.param({message: "Congrats! We are processing your order."}));
}

var processOrderedItem = function(userId, cartItem){
  $.post("http://localhost:3000/order",
         {userId: userId,
          itemId: cartItem["_id"],
          quantity: cartItem["quantity"],
          unitPrice: cartItem["unitPrice"],
          date: "",
          fullfilled: false});
}
