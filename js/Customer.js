import { Person } from "./Person.js";

export class Customer extends Person {
    constructor (id,name,address,email,type, companyName, orderValue, rating) {
        super (id,name,address,email,type);

        this.companyName = companyName;
        this.orderValue = orderValue;
        this.rating = rating;
    }
}









