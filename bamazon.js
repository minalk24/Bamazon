
//install essential packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var CFonts = require("cfonts");
var Chalk = require("chalk");
var Customer = require("./bamazonCustomer");

//welcome text
CFonts.say('BAMAZON', {
    font: 'block',              // define the font face
    align: 'left',              // define text alignment
    colors: ['candy'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line

});

askForCharacter();

//ask user their character
function askForCharacter() {

    inquirer.prompt([{

        type: "list",
        message: "Select your character?",
        choices: ["Customer", "Manager", "Supervisor", "Exit"],
        name: "character",

    }]).then(function (answer) {

        switch (answer.character) {
            case "Customer": customerChoices();
                break;
            case "Manager": managerChoices();
                break;
            case "Supervisor": supervisorChoices();
                break;
        }

    });

}

//if user selects customer choices then run 
function customerChoices() {

    //create a connection with connection configuration
    Customer.connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "bamazon_DB"
    });

    //connect to the database
    Customer.connection.connect(function (err) {
        if (err) throw err;
        Customer.DoYouWantShopping();
    });
}