const Employee = require("./employee");

class Intern extends Employee{

    constructor(id, email, name, school ){

        super(id, email, name);

        this.school  = school    ;


    }

    getGithub(){
        return this.school  ;
    }

    getRole(){
        return 'Intern'; 
    }
}

module.exports = Intern;
