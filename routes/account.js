// DEBUG: A request to change a password get wrongly routed.

const mongoose = require('mongoose');
const express = require('express');
const queryString = require('query-string');
const bcrypt = require("bcryptjs");
const jscookie = require("js-cookie");
const Account = require("../models/account");
const router = express.Router();  // Handles all the routes.

// Script for creating a new account
router.post('/', function(req, res){
  var newAccount = new Account(req.body);

  Account.find({email: req.body.email},
               function(err, docs){
                 if(err){
                   res.json({error: "Error: We had a problem creating your account. Please try again."});
                   console.log("Error: We had a problem creating your account. Please try again.");
                 }
                 else{
                   if(docs.length === 0){
                     var tempPassword = newAccount.password;
                     newAccount.password = bcrypt.hashSync(newAccount.password, bcrypt.genSaltSync(10));

                     newAccount.save(function(err, doc){
                       if(err){
                         res.json({error: "Error: We had a problem creating your account. Please try again."});
                         console.log(err);
                       }
                       else{
                         console.log("Account successfully created");
                         res.cookie("userCredentials", JSON.stringify({email: newAccount.email, password: tempPassword}));
                         res.cookie("user", newAccount.firstName);
                         res.json(doc);
                       }
                     });
                   }
                   else{
                     res.json({error: "There already exists an account with this email address."});
                     console.log("There already exists an account with this email address.");
                   }
                 }
               });

});  // End of script for creating a new account

// Script for rendering the account or login page
// Depending on whether or not the user is logged in,
// render either the account page or the login page.
router.get('/', function(req, res){
  var userCredentials = req.cookies.userCredentials;

  if(userCredentials != undefined){
    userCredentials = JSON.parse(userCredentials);
    renderAccountInfo(userCredentials, function(account){
      if(account != undefined){
        res.render("Account.ejs", {usersFirstName: account.firstName});
      }
      else{
        res.render("Login.ejs");
      }
    });
  }
  else{
    res.render("Login.ejs");
  }
}); // End of script for rendering login page

// Script for rendering the account info, based on provided credentials
router.get('/info', function(req, res){
  var userCredentials = req.cookies.userCredentials;

  if(userCredentials != undefined){
    renderAccountInfo(JSON.parse(userCredentials), function(account){
      if(account != undefined && account != null){
        res.json(account);
      }
    });
  }
}); // End of script for rendering the JSON with the account info

// Script for getting all the accounts in JSON
router.get('/accounts', function(req, res){
  Account.find({}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
}); // End of script for getting all the accounts in JSON

// Script for when the user logs in
router.get('/login', function(req, res){
  var userCredentials = {email: req.query.email, password: req.query.password};

  if(userCredentials != undefined){
    renderAccountInfo(userCredentials, function(account){
      if(account != undefined && account != null){
        res.cookie("userCredentials", JSON.stringify(userCredentials));
        res.cookie("user", account.firstName);
        res.render("Account.ejs", {usersFirstName: account.firstName});
      }
      else{
        res.render("error.ejs", {message: "Error: We had a problem logging you in."});
      }
    });
  }
  else{
    res.render("error.ejs", {message: "Error: We had a problem logging you in."});
  }
}); // End of script for logging in

// Script for getting account based on id
router.get('/[a-z,0-9]+', function(req, res){
  Account.find({_id: req.path.slice(1)}, function(err, docs){
    if(err){
      console.log("Error: We had a problem finding your account. Please try again.");
      console.log(err);
    }
    else{
      res.json(docs);
    }
  });
}); // End of script for getting account based on id

// Script for patching account (except password) based on credentials
router.patch('/', function(req, res){
  var userCredentials = JSON.parse(req.cookies.userCredentials);

  if(userCredentials != undefined && userCredentials != null){
    // Check the credentials.
    renderAccountInfo(userCredentials, function(account){
      if(account == undefined){
        res.json({error: "Error: We had a problem updating your account. Please try again."});
      }
      else{
        Account.update({_id: account._id}, req.body, function(err, numAffected){
          if(err){
            res.json({error: "Error: We had a problem updating your account. Please try again."});
            console.log("Error: We had a problem updating your account. Please try again.");
          }
          else{
            console.log("Updated Account");
            if(req.body.email){userCredentials.email = req.body.email;}
            if(req.body.firstName){res.cookie("user", req.body.firstName);}
            res.cookie("userCredentials", JSON.stringify(userCredentials));
            res.json(req.body);
          }
        });
      }
    });
  }
  else{
    console.log("Error: No credentials provided");
  }
}); // End of script for patching account based on credentials

// Script for patching account password based on credentials
router.patch('/changePassword', function(req, res){
  var userCredentials = JSON.parse(req.cookies.userCredentials);

  if(userCredentials != undefined && userCredentials != null){
    // Check the credentials.
    renderAccountInfo(userCredentials, function(account){
      if(account == undefined){
        res.json({error: "Error: We had a problem updating your password. Please try again."});
      }
      else{
        var updatedAccount = req.body;
        userCredentials.password = updatedAccount.password;
        updatedAccount.password = bcrypt.hashSync(updatedAccount.password, bcrypt.genSaltSync(10));

        Account.update({_id: account._id}, updatedAccount, function(err, numAffected){
          if(err){
            res.json({error: "Error: We had a problem updating your password. Please try again."});
            console.log("Error: We had a problem updating your password. Please try again.");
          }
          else{
            console.log("Updated Account");
            res.cookie("userCredentials", JSON.stringify(userCredentials));
            res.json(updatedAccount);
          }
        });
      }
    });
  }
  else{
    console.log("Error: No credentials provided");
  }
}); // End of script for patching account based on credentials

// Script for deleting account based on id
router.delete('/[a-z,0-9]+', function(req, res){
  Account.remove({_id: req.path.slice(1)}, function(err, numAffected){
    if(err){
      console.log("Error: We had a problem deleting your account. Please try again.");
    }
    else{
      console.log("Deleted Account");
      res.json(numAffected);
    }
  });
});   // End of script for deleting account based on id

// Script for deleting all accounts from database
router.delete('/', function(req, res){
  Account.remove({}, function(err, numAffected){
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted all Accounts");
      res.json(numAffected);
    }
  });
});   // End of script for deleting all accounts

var renderAccountInfo = function(userCredentials, doAfter){
  Account.find({email: userCredentials.email}, function(err, docs){
    if(err){
      console.log("Error: We had a problem finding your account. Please try again.");
      doAfter(undefined);
    }
    else{
      if(docs.length != 0){
        var account = docs[0];
        var valid = bcrypt.compareSync(userCredentials.password, account.password);

        if(valid){
          return doAfter(account);
        }
        else{
          console.log("Error: Incorrect password");
          doAfter(undefined);
        }
      }
      else{
        console.log("Error: We could not find an account with your email address.");
        doAfter(undefined);
      }
    }
  });
}

module.exports = router;
