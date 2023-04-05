import { Person } from "./Person.js";

export class Student extends Person {
    constructor (id,name,address,email,type, math, physics, chemistry) {
        super (id,name,address,email,type);

        this.math = math;
        this.physics = physics;
        this.chemistry = chemistry;
        this.calcAvg = 0;
    }

    // Tinh diem trung binh
    getAverageScore () {
        this.calcAvg = (this.math + this.physics + this.chemistry) / 3;
    }
}