const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function questions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "Pick from one of the options below that best suites your role with the company: ",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ]).then(response => {
            switch (response.role) {
                case "Manager":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "What is the employee's name?"
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "What is the employee's email?"
                            },
                            {
                                type: "input",
                                name: "office",
                                message: "What is this Manager's office number?"
                            }
                        ]).then(function (response) {
                            const manager = new Manager(response.name, employees.length, response.email, response.office);
                            employees.push(manager);
                            const mainHTML = render(employees);
                            fs.writeFile(outputPath, mainHTML, "utf8", err => {
                                if (err) throw err;
                            });
                            inquirer
                                .prompt([
                                    {
                                        type: "confirm",
                                        name: "another",
                                        message: "Would you like to add another member to your team?"
                                    }
                                ]).then(function (response) {
                                    if (response.another) {
                                        questions();
                                    } else {
                                        return;
                                    }
                                });
                        });
                    break;
                case "Engineer":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "What is the employee's name?"
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "What is the employee's email?"
                            },
                            {
                                type: "input",
                                name: "github",
                                message: "What is this GitHub username for this engineer?"
                            },
                        ]).then(function (response) {
                            const engineer = new Engineer(response.name, employees.length, response.email, response.github);
                            employees.push(engineer);
                            const mainHTML = render(employees);
                            fs.writeFile(outputPath, mainHTML, "utf8", err => {
                                if (err) throw err;
                            });
                            inquirer
                                .prompt([
                                    {
                                        type: "confirm",
                                        name: "another",
                                        message: "Would you like to add another member to your team?"
                                    }
                                ]).then(function (response) {
                                    if (response.another) {
                                        questions();
                                    } else {
                                        return;
                                    }
                                });
                        });
                    break;
                case "Intern":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "What is the employee's name?"
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "What is the employee's email?"
                            },
                            {
                                type: "input",
                                name: "school",
                                message: "What is the name of the school that this intern attends?"
                            }
                        ]).then(response => {
                            const intern = new Intern(response.name, employees.length, response.email, response.school);
                            employees.push(intern);
                            const mainHTML = render(employees);
                            fs.writeFile(outputPath, mainHTML, "utf8", err => {
                                if (err) throw err;
                            });
                            inquirer
                                .prompt([
                                    {
                                        type: "confirm",
                                        name: "another",
                                        message: "Would you like to add another member to your team?"
                                    }
                                ]).then(function (response) {
                                    if (response.another) {
                                        questions();
                                    } else {
                                        return;
                                    }
                                });
                        });
                    break;
                default:
                    break;
            };
        });
};

questions();





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
