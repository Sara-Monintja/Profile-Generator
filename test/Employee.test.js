const Employee = require("../src/employees/employee")


describe("Employee Test", () => {


    test("getName() will return the name property", () => {

        // arrange -- prepare the enviroment
        const name = 'Sarah';
    
        const dummy = new Employee(1, 'sda@sa.com', name);

        // act 

        const result = dummy.getName();


        // assert
        expect(result).toStrictEqual(name);


    });

})
