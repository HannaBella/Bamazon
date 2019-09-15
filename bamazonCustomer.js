require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    displayProduct();
});

function displayProduct() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " || " +
                res[i].product_name + " || " + "$" +
                res[i].price + "\n");
        }
        promptCustomer(res);
    })
}

function promptCustomer(res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase (select by id)?    [Exit with E]"
    }]).then(function(answer) {
        var reply = false;
        if (answer.choice.toUpperCase() === "E") {
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].item_id == answer.choice || res[i].product_name === answer.choice) {
                reply = true;
                var chosenId = answer.choice;
                var num = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to purchase?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer) {
                    var balance = res[num].stock_quantity - answer.quantity;
                    if (balance > 0) {
                        var total = answer.quantity * res[num].price;
                        connection.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: balance
                                },
                                {
                                    item_id: chosenId
                                }
                            ],
                            function(err, result) {
                                console.log("Your total cost is $" + total + "\n");
                                displayProduct();
                            })
                    } else {
                        console.log("Insufficient quantity");
                        promptCustomer(res);
                    }
                })
            }
        }
        if (i == res.length && reply == false) {
            console.log("Not a valid selection!");
            promptCustomer(res);
        }
    })
}