// function ListPerson () {
//     // constructor() {
//     this.personsArr = [];
//     // }

//     this.addPerson = (person) => {
//         this.personsArr.push(person);
//     }

//     this.findIndexPerson = function (id) {
//         let indexFind = -1;
//         indexFind =  this.personsArr.findIndex(function(person) {

//         return person.id == id;
//     })
//     return indexFind;
//     }

//     this.deletePerson = function (id) {
//         let index = this.findIndexPerson(id);
//         // console.log(index);

//         if (index > -1) {
//             this.personsArr.splice(index,1);   
//         }
//     }

//     this.updatePerson = function (person) {
//       var index = this.findIndexPerson(person.id);
//       if (index > -1) {
//           this.personsArr[index] = person;
//       }
//   }
// }
    

class ListPerson  {
    constructor() {
        this.personsArr = [];
    }

    addPerson = (person) => {
        this.personsArr.push(person);
    }

    findIndexPerson = function (id) {
        let indexFind = -1;
        indexFind =  this.personsArr.findIndex(function(person) {

        return person.id == id;
    })
    return indexFind;
    }

    deletePerson = function (id) {
        let index = this.findIndexPerson(id);
        // console.log(index);

        if (index > -1) {
            this.personsArr.splice(index,1);   
        }
    }

    updatePerson = function (person) {
      var index = this.findIndexPerson(person.id);
      if (index > -1) {
          this.personsArr[index] = person;
      }
  }
}



