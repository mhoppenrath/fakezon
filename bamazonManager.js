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

//
function display(){
  connection.query("SELECT * FROM Products", {
  }, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("\nID: "+ res[i].item_id + " Product: " + res[i].product_name + " Department: "+res[i].department_name + " Price: $" + res[i].price + " Items left: " + res[i].stock_quantity)
    }
  });
}

function displayLow(){
  connection.query("SELECT * FROM Products", {
  }, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity < 6) {
        console.log("\nID: "+ res[i].item_id + " Product: " + res[i].product_name + " Department: "+res[i].department_name + " Price: $" + res[i].price + " Items left: " + res[i].stock_quantity)
      };
    };
  });
}

function again(){
  inquirer.prompt([{
    type: "list",
    message: "Do another action?",
    name: "again",
    choices: ["Yes", "No"]
  }]).then(function(res){
    if (res.again === "yes"){
      beginning();
    }
  });
}

function adding(){
  display();

  inquirer.prompt([{
    type: "input",
    message: "what are you updating (item id)",
    name: "item"
  }, {
    type: "input",
    message: "How Many are you adding",
    name: "amount"
  }]).then(function(response){
    var item = parseInt(response.item);
    var amount = parseInt(response.amount);
    var newStock;
    connection.query("SELECT * FROM Products WHERE ?", [{
      item_id: item
    }], function(err,res){
      newStock = res[0].stock_quantity + amount;
      connection.query("UPDATE Products SET ? WHERE ?",[{
          stock_quantity: newStock
        }, {
          item_id: item
        }], function(err, res) {
          connection.query("SELECT * FROM Products WHERE ?", [{
            item_id:item
            }],function(err,res) {
              console.log("\nID: "+ res[0].item_id + " Product: " + res[0].product_name + " Department: "+res[0].department_name + " Price: $" + res[0].price + " Items left: " + res[0].stock_quantity)
            });
          });
        });
    });



}

//
function addItem(){
  inquirer.prompt([{
    type: "input",
    message: "What is the Item Name?",
    name: "itemName"
  }, {
    type: "input",
    message: "What Department do you want it in?",
    name: "department"
  }, {
    type: "input",
    message: "How much is the product?",
    name: "price"
  },{
    type: "input",
    message: "Many are there?",
    name: "Stock"
  }]).then(function(res){
    var amount = parseInt(res.Stock);
    var pricing = parseInt(res.price);
    console.log(res);
    connection.query("INSERT INTO Products SET ?",[{
      product_name: res.itemName,
      department_name: res.department,
      price: pricing,
      stock_quantity:amount,
     }], function(err, res) {});
  })
}

function beginning() {
  inquirer.prompt([{
    type: "list",
    message: "What do you need",
    name: "manage",
    choices: ["Looking at inventory", "looking at Low", "Adding inventory", "Add Products"]
  }]).then(function(response){
    switch(response.manage) {
      case "Looking at inventory":
        display();
        break;
      case "looking at Low":
        displayLow();
        break;
      case "Adding inventory":
        adding();
        break;
      case "Add Products":
        addItem();
        break;
    }
  })
}

beginning();
