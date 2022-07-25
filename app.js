const inquirer = require('inquirer');
const Manager = require('./src/employees/manager');
const Engineer = require('./src/employees/engineer');
const Intern = require('./src/employees/intern');
const fs = require('fs');
const path = require('path');
const generateHtml = require('./src/generate-html/html')

const employees = [];
const outputHtmlFile = path.join(__dirname, 'output', 'team.html')

async function main() {

    const managerRole = 'manager';
    const engineerRole = 'engineer';
    const internRole = 'intern';

    const answers = await inquirer.prompt([
        {
            type: 'list',
            message: "What is the role?",
            name: 'role',
            choices: [
                'manager',
                'engineer',
                'intern',
            ]
        },
        {
            type: 'input',
            message: "What is the ID of employee?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is the name of employee?",
            name: 'name',
        },
        {
            type: 'input',
            message: "What is the email of employee?",
            name: 'email'
        },
        {
            type: 'input',
            message: 'What is the office number?',
            name: 'office_number',
            when: (answers) => answers.role === 'manager',
        },
        {
            type: 'input',
            message: 'What is the github username?',
            name: 'github',
            when: (answers) => answers.role === 'engineer',
        },
        {
            type: 'input',
            message: 'What is the school?',
            name: 'school',
            when: (answers) => answers.role === 'intern', 
        },
        {
            type: 'confirm',
            message: 'Add another employee?',
            name: 'add_another',
        }
        
    ]);
        


    // once we got an employee, store it 
    // check for the role
  
    if (answers.role === 'manager'){
    employees.push(new Manager(answers.id, answers.email, answers.name, answers.office_number));
    }
    if (answers.role === 'engineer'){
    employees.push(new Engineer(answers.id, answers.email, answers.name, answers.github));
    }
    if (answers.role === 'intern'){
    employees.push(new Intern(answers.id, answers.email, answers.name, answers.school));
    }


console.log(employees);

// once the user says enough, we will generate the html based on all the employees collected
    if(!answers.add_another){
    // generate html
    const html = generateHtml(employees);

    // call fs, write to a file
    fs.writeFileSync(outputHtmlFile, html, 'utf-8')

    }else{
    await main();
    }

}

// generate html

main();