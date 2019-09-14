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