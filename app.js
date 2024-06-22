#! /usr/bin/env node
// Importing the required modules
import inquirer from "inquirer";
import chalk from "chalk";
// Generating a random student id
let random = Math.floor(2000 + Math.random() * 50000);
// Initializing the balance variable
let balance = 0;
// Prompting the user to enter their name and select a course
let userName = await inquirer.prompt([
    {
        type: "input",
        name: 'name',
        message: "Please enter your name:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            else {
                return "Please enter a non empty value";
            }
        }
    },
    {
        type: "list",
        name: "course",
        message: "Please select your course",
        choices: ['Html', 'Ms office', 'Java script', 'Typescript']
    }
]);
// Destructuring the user's Input
let { name, course } = userName;
// Defining the tusion fee for each course
const tutionfee = {
    'Html': 15000,
    'Ms office': 20000,
    'Java script': 35000,
    'Typescript': 40000
};
// Display the tution fee for the selected course and the initial balance
console.log(chalk.blueBright.bold(`Tusion fee: ${tutionfee[course]}`));
console.log(chalk.bold.blue(`Balance: ${balance}`));
// Prompting the user to select a payment method and enter the amount
let paymentInput = await inquirer.prompt([
    {
        type: "list",
        name: "payment",
        message: "\nPlease select your payment method",
        choices: ["Bank  Transfer", "Easy pesa", "Jazz cash"]
    },
    {
        type: "input",
        name: "amount",
        message: "Transfer money:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            else {
                return 'Please enter a valid amount';
            }
        }
    }
]);
// Destructuring the user's payment input
let { payment, amount } = paymentInput;
//Display the selected payment method
console.log(chalk.green.bold(`\nYou selected the payment method: ${payment}`));
// Retrieving the tution fee for the selected course
const tusion = tutionfee[course];
// parsing the payment amount to a float
const paymentAmount = parseFloat(amount);
// Checking if the entered amount matches the tution fee
if (tusion === paymentAmount) {
    console.log(chalk.green.bold(`\nCongratulations! you have successfully enrollerd in ${course}`));
    // Prompting the user to view the status or Exit
    let answer = await inquirer.prompt({
        type: "list",
        name: "user",
        message: "\nWhat would you like to do next?",
        choices: ["View status", "Exit"]
    });
    // Display the user's status if they choose to view it
    if (answer.user === 'View status') {
        console.log(`Student Name: ${name}`);
        console.log(`Student Id: ${random}`);
        console.log(`Course: ${course}`);
        console.log(`Tution fee paid: ${amount}`);
        console.log(`Balance: ${balance += paymentAmount}`);
    }
    else {
        //Exiting the student management system
        console.log(chalk.red(`\nExiting the student management system`));
    }
}
else {
    // Displaying an error message if the amount is valid
    console.log(chalk.red('\nInvalid amount'));
}
