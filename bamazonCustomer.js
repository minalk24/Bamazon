
var mysql = require("mysql");
var inquirer = require("inquirer");
var Chalk = require("chalk");
var CFonts = require('cfonts');

CFonts.say('Welcome!', {
    font: 'block',              // define the font face
    align: 'left',              // define text alignment
    colors: ['candy'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
});

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon_DB"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the function after the connection is made to prompt the user
    askForCharacter();
  });
  
 
  function askForCharacter(){
    inquirer.prompt([{
        type:"list",
        message:"Select your Character?",
        name:"Character",
        choices:["Customer","Manager","Supervisor","Exit"]
    }]).then(function(response){
        switch (response.Character){
            case "Customer":    customerChoices();
                                break;
            case "Manager":     managerChoices();
                                break;
            case "Supervisor":  supervisorChoices();
                                break;
        }
    });
}