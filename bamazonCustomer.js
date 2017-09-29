//requires our two main NPM modules
var mysql = require("mysql");
var inquirer = require("inquirer");

//creates a connection to the local host. BTW RUN THE dbInitialzer FIRST OR THE APP WILL FAIL!!!
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "321654",
  database: "fakazon"
});

//displays all the products in the console
function display(){
  connection.query("SELECT * FROM Products", {
  }, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("\nID: "+ res[i].item_id + " Product: " + res[i].product_name + " Department: "+res[i].department_name + " Price: $" + res[i].price + " Items left: " + res[i].stock_quantity)
    }
  });
}


//"buys the" item and checks to see if there is enough.
function buying(item, amount){
  connection.query("SELECT * FROM Products WHERE item_id =" + item, {
  }, function(err, res) {
    if (res[0].stock_quantity >= amount) {
      var change = res[0].stock_quantity - amount;
      console.log(change);
      update(item, change);

    }
    else {
      console.log("There isn't enought to buy");
    }
  });
}

function update(item, amount){
  connection.query("UPDATE Products SET ? WHERE ?",[{
    stock_quantity: amount
  }, {
    item_id: item
  }], function(err, res) {});
  connection.query("SELECT * FROM Products WHERE ?", [{
    item_id:item
  }],function(err,res) {
    console.log("\nID: "+ res[0].item_id + " Product: " + res[0].product_name + " Department: "+res[0].department_name + " Price: $" + res[0].price + " Items left: " + res[0].stock_quantity)
  });
}


function beginning() {
  display();
  inquirer.prompt([{
    type: "input",
    message: "What would you like to purcuse (use the product ID)? ",
    name: "item"
  },
  {
    type: "input",
    message: "How many would you like? ",
    name: "amount"
  }]).then(function(response){
    console.log("you are buying stuff")
    buying(response.item, response.amount);
  })
}

beginning();
