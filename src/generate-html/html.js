const fs = require('fs');
const path = require('path');

const cardTemplatePath = path.join(__dirname, 'templates', 'card.html')
const mainTemplatePath = path.join(__dirname, 'templates', 'main.html')




function createCard(employee){
    
    // read the cards.html templ
    const cardTemplate = fs.readFileSync(cardTemplatePath, 'utf-8')

    // replace the placeholders with the actual data 
    let replaced = cardTemplate.replace('{{name}}', employee.getName())
        .replace('{{id}}', employee.getId())
        .replaceAll('{{email}}', employee.getEmail())
        .replace('{{role}}', employee.getRole());

    if(employee.getRole() === 'Manager'){
        replaced = replaced.replace('{{attr_key}}', 'Office Number')
            .replaceAll('{{attr_value}}', employee.getOfficeNumber())
    }
    if(employee.getRole() === 'Engineer'){
        replaced = replaced.replace('{{attr_key}}', 'Github')
            .replaceAll('{{attr_value}}', "https://github.com/"+ employee.getGithub())
    }
    if(employee.getRole() === 'Intern'){
        replaced = replaced.replace('{{attr_key}}', 'school')
            .replaceAll('{{attr_value}}', employee.getSchool())
    }

    return replaced;
}


function generateHtml(employees){

    const mainTemplate = fs.readFileSync(mainTemplatePath, 'utf-8')
    // loop thru each employee 
    // generate a card for each employee

    const cards = employees.map(createCard).join('')


    return mainTemplate.replace('{{body}}', cards);


}


module.exports = generateHtml