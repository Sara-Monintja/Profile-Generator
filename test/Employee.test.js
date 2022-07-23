const Employee = require("../src/employees/employee")


describe("Employee Test", () => {


    test("getName() will return the name property", () => {

        // arrange -- prepare the enviroment
        const name = 'sam';
    
        const dummy = new Employee(1, 'sam@sam.com', name);

        // act 

        const result = dummy.getName();


        // assert
        expect(result).toStrictEqual(name);


    });

})
