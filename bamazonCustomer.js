//git
var inquirer = require("inquirer");
var Table = require('cli-table');
var Chalk = require("chalk");

var customer = {};

customer.DoYouWantShopping = function () {

  inquirer.prompt([{
    message: "What would you like to do?",
    type: "list",
    name: "activity",
    choices: ["Shopping", "Exit"]
  }]).then(function (answer) {

    //If user select shopping
    if (answer.activity === "Shopping") {

      //query for getting all product info
      customer.connection.query("SELECT * FROM products WHERE stock_quantity >0",
        function (err, res) {

          if (err) throw err;

          if (res.length === 0) {
            console.log(Chalk.red("Products are not available\n"));
            customer.connection.end();
          }

          else {
            var table = new Table({
              //tableheaders
              head: ["ID", "Product", "Department", "Price", "Stock"],
              //columnwidths
              colWidths: [10, 20, 15, 10, 10]
            });

            for (var i = 0; i < res.length; i++) {
              table.push(
                [res[i].product_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity],
              );
            }
            //print table
            console.log(table.toString());

            //Ask user for the ID of the product 
            inquirer.prompt([
              {
                message: "What is the ID of the item you would like to purchase?",
                name: "productID",
                type: "input",
                validate: function (value) {
                  for (var i = 0; i < value.length; i++)
                    if (isNaN(parseInt(value[i]))) return false;

                  return true;
                }
              }]).then(function (answer) {

                customer.connection.query("SELECT * FROM products WHERE ? AND stock_quantity > 0",
                  [{
                    product_id: parseInt(answer.productID)
                  }],
                  function (err, res) {

                    if (err) throw err;

                    if (res.length === 0) {
                      console.log(Chalk.red("Invalid Product ID\n"));
                      customer.DoYouWantShopping();
                    }

                    else {

                      //ask user quantity
                      inquirer.prompt([
                        {
                          message: "How many would you like?",
                          name: "quantity",
                          type: "input",
                          validate: function (value) {
                            for (var i = 0; i < value.length; i++)
                              if (isNaN(parseInt(value[i]))) return false;
                            if (parseInt(value) === 0) return false;

                            return true;
                          }
                        }]).then(function (answer2) {

                          customer.isProductStockAvailable(parseInt(answer.productID), parseInt(answer2.quantity));
                        });
                    }
                  });
              }); //2nd .then complete
          }
        });
    }
    //If user chooses "exit", end the connection
    else {
      customer.connection.end();
    }
  });
}

customer.isProductStockAvailable = function (productID, quantity) {

  customer.connection.query("SELECT * FROM products WHERE ?",
    [{
      product_id: productID
    }], function (err, res) {

      if (err) throw err;

      if (res[0].stock_quantity < quantity) {
        console.log(Chalk.red("Insufficient Stock: Only " + res[0].stock_quantity + " left in stock\n"));
        customer.DoYouWantShopping();
      }

      else {

        var updatedStock = res[0].stock_quantity - quantity;

        var newProductSale = res[0].product_sales + res[0].price * quantity;

        //order details
        console.log("\n-------------------------------")
        console.log("Product: " + res[0].product_name)
        console.log("Department: " + res[0].department_name)
        console.log("Quantity: " + quantity);
        console.log("Price/Unit: " + res[0].price);
        console.log("Total Price: " + (res[0].price * quantity).toFixed(2));
        console.log("----------------------------------\n")

        //ask for order confirmation
        inquirer.prompt([{
          message: "Are you sure, you want to place the order?",
          type: "confirm",
          name: "doBuy",
          default: false
        }]).then(function (answer) {
          if (answer.doBuy)
            customer.placeAnOrder(productID, quantity, updatedStock, newProductSale);

          else
            customer.DoYouWantShopping();
        });

      }
    });
}

//place an order function
customer.placeAnOrder = function(productID, quantity, updatedStock, newProductSale){

  customer.connection.query("UPDATE products SET ? WHERE ?",
  [{
      stock_quantity:updatedStock,
      product_sales:newProductSale
  },
  {
      product_id:productID
  }],
  function(err,res){

      if(err) throw err;

      if(res.affectedRows === 1)
          customer.showOrderMessage(productID,quantity);
      else{
          console.log(Chalk.red("Sorry! Could not place your order due to technical issue, Try again!\n"));
          customer.DoYouWantShopping();
      }
  });
}

customer.showOrderMessage = function(productID,quantity){

  //get the product information from the database
  customer.connection.query("SELECT product_name, price FROM products WHERE ?",
  [{
      product_id:productID
  }],
  function(err,res){

      if(err) throw err;

      console.log(Chalk.bold("Your order of "+ quantity+ " "+res[0].product_name + " was successfully placed for $"+ (res[0].price*quantity).toFixed(2)+" !!!\n"))
      customer.DoYouWantShopping();
  });
}

//export customer object
module.exports = customer;