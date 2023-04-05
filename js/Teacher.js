import { Person } from "./Person.js";

export class Teacher extends Person {
    constructor (id,name,address,email,type,workingDays, dailySalary) {
        super(id,name,address,email,type);

        this.workingDays = workingDays;
        this.dailySalary = dailySalary;
        this.calcSalary = 0;
    }


    getSalary () {
        this.calcSalary = this.workingDays * this.dailySalary;
    }
}








