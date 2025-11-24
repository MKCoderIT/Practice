const students = [
    { id: 1, name: "Kamyar", age: 18, scores: [18, 17, 19] },
    { id: 2, name: "Ali", age: 19, scores: [12, 14, 10] },
    { id: 3, name: "Sara", age: 17, scores: [20, 19, 18] },
    { id: 4, name: "Reza", age: 20, scores: [15, 16, 14] },
    { id: 5, name: "Nika", age: 18, scores: [9, 11, 8] },
    { id: 6, name: "Mahdi", age: 21, scores: [16, 18, 17] },
    { id: 7, name: "Bahar", age: 22, scores: [19, 18, 10] }
];
const studentTableBody = document.querySelector('.students__table > tbody');
const studentTableFormBody = document.querySelector('.students-body__score-table > tbody');
const studentFilterButton = document.querySelector('.header__filter--submit');

StudentAddGPA()
StudentTableUpdate();

function Reduce(arry, func, initialvalue = 0) {
    let sum = initialvalue;
    for (let i = 0; i < arry.length; i++) {
        sum = func(sum, arry[i]);
    }
    return sum;
}
function InsertoinSort(arry, ascending = true, func = null) {

}

const test = [1, 10, 22, 3, 43, 11, 6];
const test2 = ["kamyar", [], 22, [] , true , {} , "ali", 8, {}, "zahra", false, Symbol('sym'), () => { }, true, 14, "mina", {}, 12, 77, 'mohammad'];

Array.prototype.BubbleSort = function (ascending = true, func = null) {
    let n = this.length;

    let hasString = false;
    let hasNumber = false;

    const Arrays = {
        base: this,
        stringArry: [],
        numberArry: [],
        otherArry: []
    }

    if (!func) {
        for (let i = 0; i < n; i++) {
            if (typeof this[i] === "string") {
                hasString = true;
            }
            if (typeof this[i] === "number") {
                hasNumber = true;
            }
            if (hasNumber && hasString) {
                break;
            }
        }
        if (hasString && hasNumber) {
            for (let i = 0; i < n; i++) {
                if (typeof this[i] === "string") {
                    Arrays.stringArry.push(this[i]);
                } else if (typeof this[i] === "number") {
                    Arrays.numberArry.push(this[i]);
                } else {
                    Arrays.otherArry.push(this[i]);
                }
            }

            if (Arrays.otherArry) {
                const otherArraySort = {};
                const copyOtherArry = Arrays.otherArry;
                Arrays.otherArry = [];
                copyOtherArry.forEach(item => {
                    const itemType = typeof item;
                    if (!otherArraySort[itemType]) {
                        otherArraySort[itemType] = [];
                    }
                    otherArraySort[itemType].push(item);
                })
                for (const element in otherArraySort) {
                    if (element === "boolean") {
                        otherArraySort[element].BubbleSort(true, (a, b) => a == false);
                    }
                    Arrays.otherArry.push(...otherArraySort[element])
                }
            }

            Arrays.stringArry.BubbleSort(ascending);
            Arrays.numberArry.BubbleSort(ascending);

            const resultArray = ascending ? Arrays.numberArry.concat(Arrays.stringArry, Arrays.otherArry) : Arrays.otherArry.concat(Arrays.stringArry, Arrays.numberArry);

            for (let i = 0; i < n; i++) {
                this[i] = resultArray[i];
            }
            return;
        }
    }
    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - 1 - i; j++) {

            let compareResult = 0;
            if (!func) {
                if (hasString && !hasNumber) {
                    compareResult = this[j].localeCompare(this[j + 1]);
                }
                else {
                    if (this[j] > this[j + 1]) {
                        compareResult = 1;
                    } else if (this[j] < this[j + 1]) {
                        compareResult = -1;
                    }
                }
            } else {
                const funcAction = func(this[j], this[j + 1]);
                if (funcAction > 0) {
                    compareResult = 1;
                } else if (funcAction < 0) {
                    compareResult = -1;
                }
            }

            let shouldSwap;
            if (ascending) {
                shouldSwap = compareResult > 0;
            } else {
                shouldSwap = compareResult < 0;
            }

            if (shouldSwap) {
                let temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
}
test2.BubbleSort(true);
console.log(test2);



function GPA(studentsScores) {
    return Reduce(studentsScores, (acc, cur) => acc + cur) / studentsScores.length;

}
function StudentAddGPA() {
    students.forEach(item => {
        item.gpa = GPA(item.scores);
    });
}


function StudentTableUpdate(sort = "name", filter = "all") {
    studentTableBody.innerHTML = "";
    let resultArray = [...students];
    if (sort === "name") {
        resultArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "age") {
        resultArray.sort((a, b) => b.age - a.age);
    } else if (sort === "gpa") {
        resultArray.sort((a, b) => b.gpa - a.gpa);;
    }
    if (filter === "passing") {
        resultArray = resultArray.filter((data) => data.gpa >= 10);
    } else if (filter === "failed") {
        resultArray = resultArray.filter((data) => data.gpa <= 10);
    }

    resultArray.forEach(student => {
        const tr = document.createElement("tr");
        tr.dataset.id = student.id;

        const nameTD = document.createElement("td");
        nameTD.textContent = student.name;

        const ageTD = document.createElement("td");
        ageTD.textContent = student.age;

        tr.appendChild(nameTD);
        tr.appendChild(ageTD);

        studentTableBody.appendChild(tr);
    });
}

function StudentformTableUpdate(id) {
    const student = students.find(s => s.id === Number(id));
    if (!student) return;

    const nameTag = document.querySelectorAll(".students-body__name > span")[1];
    const ageTag = document.querySelectorAll(".students-body__age > span")[1];
    const GPATag = document.querySelectorAll(".students-body__gpa > span")[1];

    nameTag.textContent = student.name;
    ageTag.textContent = student.age;
    GPATag.textContent = GPA(student.scores).toFixed(2);

    const tr = document.createElement("tr");

    const physicTD = document.createElement("td");
    physicTD.textContent = student.scores[0];

    const mathTD = document.createElement("td");
    mathTD.textContent = student.scores[1];

    const chemiTD = document.createElement("td");
    chemiTD.textContent = student.scores[2];

    tr.appendChild(physicTD);
    tr.appendChild(mathTD);
    tr.appendChild(chemiTD);

    studentTableFormBody.innerHTML = "";
    studentTableFormBody.appendChild(tr);
}

studentFilterButton.addEventListener("click", () => {
    const sortBy = document.querySelector(".header__sort-select").value;
    const Radio = document.querySelector(".header__radio-input:checked");
    const filterby = Radio ? Radio.value : "all";
    StudentTableUpdate(sortBy, filterby);
});

studentTableBody.addEventListener("click", e => {
    const clickedRow = e.target.closest("tr");
    if (!clickedRow) return;

    const id = clickedRow.dataset.id;
    StudentformTableUpdate(id);
});



