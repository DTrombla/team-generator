const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// array of questions for user
const questions = [
    {
    type: "list",
    name:"role",
    message: "What role are you adding to the team?",
    choices: ["Manager", "Engineer", "Intern"]
    },
    {
    type: "input",
    name:"name",
    message: "What is their name?"
    },
    {
    type: "input",
    name:"id",
    message: "What is their id?"
    },
    {
    type: "input",
    name:"email",
    message: "What is their email?"
    },
    {
    type: "input",
    name:"officeNumber",
    message: "What is their office number?",
    when: (questions) => questions.role === "Manager"
    },
    {
    type: "input",
    name:"github",
    message: "What is their Github username?",
    when: (questions) => questions.role === "Engineer"
    },
    {
    type: "input",
    name:"school",
    message: "What school did/do they attend?",
    when: (questions) => questions.role === "Intern"
    },
    {
    type: "confirm",
    name:"add",
    message: "Would you like to add another team member?",
    }
];





const employees = []
function init() {
inquirer
.prompt(questions)
.then(response => {

    if(response.role == "Manager"){
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager)
    }
    else if(response.role == "Engineer"){
    const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer)
    }
    else if(response.role == "Intern"){
    const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern)
    };
    if(response.add == true){
        init();
    }
    else{
    fs.writeFile(outputPath, render(employees), (err)=> err ? console.error(err) : console.log("Successful generation")); 
    }
})
};

init();


