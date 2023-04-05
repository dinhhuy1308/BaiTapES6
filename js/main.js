import { Student } from "./Student.js"; 
import { Teacher } from "./Teacher.js";
import { Customer } from "./Customer.js";

const list = new ListPerson();
const validation = new Validation ();

function getELE(id) {
    return document.getElementById(id);
}

// Sự kiện thay đổi các ô input
getELE('type').addEventListener('change', () => {
    const type = getELE('type').value;
    changeInput(type);
})
const changeInput = (type) => {
    let content = '';
    if (type == 'Student') {
        content = `
        <div class="form-group">
            <input id="math" class="form-control" placeholder="Math Score" />
            <span id="tbMath"></span>
        </div>
        <div class="form-group">
            <input id="physics" class="form-control" placeholder="Physics Score" />
            <span id="tbPhysics"></span>
        </div>
        <div class="form-group">
            <input id="chemistry" class="form-control" placeholder="Chemistry Score" />
            <span id="tbChemistry"></span>
        </div>   
        `
    } else if (type == 'Teacher') {
        content = `
        <div class="form-group">
            <input id="workingDays" class="form-control" placeholder="Work Days" />
            <span id="tbWorkingDays"></span>
        </div>
        <div class="form-group">
            <input id="dailySalary" class="form-control" placeholder="Daily Salary" />
            <span id="tbDailySalary"></span>
        </div>
        `
    } else if (type == 'Customer') {
        content = `
        <div class="form-group">
            <input id="companyName" class="form-control" placeholder="Company Name" />
            <span id="tbCompanyName"></span>
        </div>
        <div class="form-group">
            <input id="orderValue" class="form-control" placeholder="Order Value" />
            <span id="tbOrderValue"></span>
        </div>
        <div class="form-group">
            <input id="rating" class="form-control" placeholder="Rating" />
            <span id="tbRating"></span>
        </div>
        `
    }
    getELE('list').innerHTML = content;
}

//  HIện bảng Table
const showTable = (array) =>  {
    var content ="";

    array.map((people) => {
        
        const {id,name,email,address,type} = people;
        let text = ``;
        if (type == 'Student') {
            text = `<button style='width: 130px' onclick="averageStu('${id}')" class="btn btn-success">Average Score</button>`
        } else if (type == 'Teacher') {
            text = `<button style='width: 130px' onclick="salTeacher('${id}')" class="btn btn-dark">Calculate Salary</button>`
        };

        let trELE = '';
        trELE = `
        <tr class='text-center'>
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${address}</td>
            <td>${type}</td>
            <td>${text}</td>
            <td>
                <button onclick="deletePer('${id}')"  style='width: 50px' class='btn btn-danger'><i class="fa fa-trash"></i></button>
                <button onclick="showDetail('${id}')" data-toggle="modal" data-target="#myModal" style='width: 50px;' class='btn btn-primary'><i class="fa fa-pen"></i> </button>
            </td>
        </tr>`;
            content += trELE;
    });
    getELE('tbListPerson').innerHTML = content;
};


// Local Storage
const setLocalStorage = (array) => {
    localStorage.setItem('listPer',JSON.stringify(array));
}

const getLocalStorage = () => {
    if (localStorage.getItem('listPer') != null) {
        list.personsArr = JSON.parse(localStorage.getItem('listPer'));
        showTable(list.personsArr);
    }
}
getLocalStorage();

// Thêm Person
function addPerson() {
    var isValid = true;

    var id = getELE("id").value;
    var name = getELE("name").value;
    var address = getELE("address").value;
    var email = getELE("email").value;
    var type = getELE("type").value

    if (type == 'Student') {
        var math = getELE("math").value;
        var physics = getELE("physics").value;
        var chemistry = getELE("chemistry").value;
        isValid &= validation.checkEmpty(math, "tbMath", "Math score annot be empty") && validation.checkScore(math, "tbMath", "Invalid Math score");
        isValid &= validation.checkEmpty(physics, "tbPhysics", "Physics score annot be empty") && validation.checkScore(physics, "tbPhysics", "Invalid Physics score");
        isValid &= validation.checkEmpty(chemistry, "tbChemistry", "Chemistry score annot be empty") && validation.checkScore(chemistry, "tbChemistry", "Invalid Chemistry score");
    } else if (type == 'Teacher') {
        var workingDays = getELE("workingDays").value;
        var dailySalary = getELE("dailySalary").value;
        isValid &= validation.checkEmpty(workingDays, "tbWorkingDays", "Working Days annot be empty") && validation.checkValue(workingDays, "tbWorkingDays", "Working days must be greater than 0");
        isValid &= validation.checkEmpty(dailySalary, "tbDailySalary", "Daily Salary annot be empty") && validation.checkValue(dailySalary, "tbDailySalary", "Daily Salary must be greater than 0");
    } else if (type == 'Customer') {
        var companyName = getELE("companyName").value;
        var orderValue = getELE("orderValue").value;
        var rating = getELE("rating").value;
        isValid &= validation.checkEmpty(companyName, "tbCompanyName", "Company Name annot be empty");
        isValid &= validation.checkEmpty(orderValue, "tbOrderValue", "Order Value annot be empty") && validation.checkValue(orderValue, "tbOrderValue", "Order Value must be greater than 0");
        isValid &= validation.checkEmpty(rating, "tbRating", "Rating annot be empty");
    }


    isValid &= validation.checkEmpty(id, "tbID", "Id cannot be empty") && validation.checkID(id, "tbID", "ID cannot be duplicated", list.personsArr);
    isValid &= validation.checkEmpty(name, "tbName", "Name cannot be empty") && validation.checkName(name, "tbName", "Name must be letters");
    isValid &= validation.checkEmpty(address, "tbAddress", "Address cannot be empty");
    isValid &= validation.checkEmpty(email, "tbEmail", "Email cannot be empty") && validation.checkEmail(email, "tbEmail", "Invalid Email");
    isValid &= validation.checkSelect('type', 'tbType', 'Please select location');

    if (isValid) {
        if (type == 'Student') {
            let person = new Student(id, name, address, email, type, Number(math), Number(physics), Number(chemistry));
            person.getAverageScore();
            console.log(person)
            list.addPerson(person);
            showTable(list.personsArr)
            setLocalStorage(list.personsArr);
        } else if (type == 'Teacher') {
            let person = new Teacher(id, name, address, email, type, Number(workingDays), Number(dailySalary));
            person.getSalary();
            console.log(person)
            list.addPerson(person);
            showTable(list.personsArr)
            setLocalStorage(list.personsArr);
        } else if (type == 'Customer') {
            let person = new Customer(id, name, address, email, type, companyName, orderValue, rating);
            console.log(person)
            list.addPerson(person);
            showTable(list.personsArr)
            setLocalStorage(list.personsArr);
        }

        document.querySelector('#myModal .close').click();
    }

}
getELE('btnAddPeroson').onclick = addPerson;

getELE('btnAdd').addEventListener('click', () => {
    getELE('btnAddPeroson').style.display = 'block';
    getELE('btnUpdatePerson').style.display = 'none';
    
    getELE('formProduct').reset();

    getELE("id").disabled = false;
}) 

// Xóa Person
window.deletePer = function (id) {
    list.deletePerson(id);
    setLocalStorage(list.personsArr);
    getLocalStorage();
}

// Hiển thị chi tiết
const showDetail = (id) => {
    getELE('btnAddPeroson').style.display = 'none';
    getELE('btnUpdatePerson').style.display = 'block';

    var index = list.findIndexPerson(id);
    if (index > -1) {
        getELE('id').value = list.personsArr[index].id;
        getELE('id').disabled = true;
        getELE('name').value = list.personsArr[index].name;
        getELE('address').value = list.personsArr[index].address;
        getELE('email').value = list.personsArr[index].email;
        getELE('type').value = list.personsArr[index].type;

        const type = getELE('type').value;
        changeInput(type);

        if (type == 'Student') {
            getELE('math').value = list.personsArr[index].math;
            getELE('physics').value = list.personsArr[index].physics;
            getELE('chemistry').value = list.personsArr[index].chemistry;
        } else if (type == 'Teacher') {
            getELE('workingDays').value = list.personsArr[index].workingDays;
            getELE('dailySalary').value = list.personsArr[index].dailySalary;
        } else if (type == 'Customer') {
            getELE('companyName').value = list.personsArr[index].companyName;
            getELE('orderValue').value = list.personsArr[index].orderValue;
            getELE('rating').value = list.personsArr[index].rating;
        } 
    }
}
window.showDetail = showDetail;

// Cập nhật Person
const updatePer = (id) => {
    var isValid = true


    var id = getELE("id").value;
    var name = getELE("name").value;
    var address = getELE("address").value;
    var email = getELE("email").value;
    var type = getELE("type").value
    if (type == 'Student') {
        var math = getELE("math").value;
        var physics = getELE("physics").value;
        var chemistry = getELE("chemistry").value;
        isValid &= validation.checkEmpty(math, "tbMath", "Math score annot be empty") && validation.checkScore(math, "tbMath", "Invalid Math score");
        isValid &= validation.checkEmpty(physics, "tbPhysics", "Physics score annot be empty") && validation.checkScore(physics, "tbPhysics", "Invalid Physics score");
        isValid &= validation.checkEmpty(chemistry, "tbChemistry", "Chemistry score annot be empty") && validation.checkScore(chemistry, "tbChemistry", "Invalid Chemistry score");
    } else if (type == 'Teacher') {
        var workingDays = getELE("workingDays").value;
        var dailySalary = getELE("dailySalary").value;
        isValid &= validation.checkEmpty(workingDays, "tbWorkingDays", "Working Days annot be empty") && validation.checkValue(workingDays, "tbWorkingDays", "Working days must be greater than 0");
        isValid &= validation.checkEmpty(dailySalary, "tbDailySalary", "Daily Salary annot be empty") && validation.checkValue(dailySalary, "tbDailySalary", "Daily Salary must be greater than 0");
    } else if (type == 'Customer') {
        var companyName = getELE("companyName").value;
        var orderValue = getELE("orderValue").value;
        var rating = getELE("rating").value;
        isValid &= validation.checkEmpty(companyName, "tbCompanyName", "Company Name annot be empty");
        isValid &= validation.checkEmpty(orderValue, "tbOrderValue", "Order Value annot be empty") && validation.checkValue(orderValue, "tbOrderValue", "Order Value must be greater than 0");
        isValid &= validation.checkEmpty(rating, "tbRating", "Rating annot be empty");
    }


    // isValid &= validation.checkEmpty(id, "tbID", "Id cannot be empty") && validation.checkID(id, "tbID", "ID cannot be duplicated", list.personsArr);
    isValid &= validation.checkEmpty(name, "tbName", "Name cannot be empty") && validation.checkName(name, "tbName", "Name must be letters");
    isValid &= validation.checkEmpty(address, "tbAddress", "Address cannot be empty");
    isValid &= validation.checkEmpty(email, "tbEmail", "Email cannot be empty") && validation.checkEmail(email, "tbEmail", "Invalid Email");
    isValid &= validation.checkSelect('type', 'tbType','Please select location');



    if (isValid) {
        if (type == 'Student') {
            let person = new Student(id, name, address, email, type, Number(math), Number(physics), Number(chemistry));
            person.getAverageScore();
    
            list.updatePerson(person);    
            showTable(list.personsArr)
            setLocalStorage();
        } else if (type == 'Teacher') {
            let person = new Teacher(id, name, address, email, type, Number(workingDays), Number(dailySalary));
            person.getSalary();
    
            list.updatePerson(person);    
            showTable(list.personsArr)
            setLocalStorage();
        } else if (type == 'Customer') {
            let person = new Customer(id, name, address, email, type, companyName, orderValue, rating);
    
            list.updatePerson(person);    
            showTable(list.personsArr)
            setLocalStorage();
        }
    
        document.querySelector('#myModal .close').click();
    }

}
getELE('btnUpdatePerson').onclick = updatePer;


// Sắp xếp Person
getELE("asc").addEventListener('click', () => {
    list.personsArr.sort(function (a, b) {
        let fa = a.name.toLowerCase().split(' ').slice(-1);
        let fb = b.name.toLowerCase().split(' ').slice(-1);

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    })
    showTable(list.personsArr);
});

getELE("desc").addEventListener('click', () => {
    list.personsArr.sort(function (a, b) {
        let fa = a.name.toLowerCase().split(' ').slice(-1).join(' ');
        let fb = b.name.toLowerCase().split(' ').slice(-1).join(' ');

        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
    })
    showTable(list.personsArr);
});

// Lọc Person
getELE("kind").addEventListener('change', () => {
    const kind = getELE("kind").value;

    let filterData;

    if (kind == 'All') {
        filterData = list.personsArr;
    } else {
        filterData = list.personsArr.filter((element) => {
            return element.type == kind;
        })
    }
    showTable(filterData);
})
    

const averageStu = (id) => {
    let person = (list.personsArr[list.findIndexPerson(id)]);
    swal("Average Score",  person.name + ': ' + person.calcAvg.toFixed(2) );
    // alert("Điểm trung bình của " + person.name + " là " + person.calcAvg.toFixed(2));

}
window.averageStu = averageStu;

const salTeacher = (id) => {
    let person = (list.personsArr[list.findIndexPerson(id)]);
    swal("Salary",  person.name + ": " + person.calcSalary.toLocaleString() + " VNĐ" );
    // alert("Lương của " + person.name + " là " + person.calcSalary.toLocaleString() + " VNĐ");
}
window.salTeacher = salTeacher;




