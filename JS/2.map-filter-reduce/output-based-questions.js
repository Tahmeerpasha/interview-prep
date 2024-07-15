// Map, Filter and Reduce - O/P based questions

let students = [
    { name: "Tahmeer", rollNumber: 1, marks: 90 },
    { name: "Maxson", rollNumber: 20, marks: 80 },
    { name: "Umar", rollNumber: 30, marks: 70 },
    { name: "Sarkheel", rollNumber: 4, marks: 60 },
    { name: "Sagheer", rollNumber: 5, marks: 50 }
]

// Q1. Return only name of students in capital

const names = students.map(student => student.name.toUpperCase());
console.log(names);

// Q2. Return details of those students who scored more than 60

const topStudents = students.filter(student => student.marks > 60);
console.log(topStudents);

// Q3. Marks more than 60 and rollNumber greater than 15

const filteredStudents = students.filter(student => student.marks > 60 && student.rollNumber > 15)
console.log(filteredStudents)

// Q4. Sum of marks of all the students

const sumOfAll = students.reduce((acc, current) => current.marks + acc, 0)
console.log(sumOfAll)

// Q5. Return only names of students who scored more than 60

const namesOfStudentAbove60 = students.filter((student) => student.marks > 60).map(student => student.name);
console.log(namesOfStudentAbove60)

// Q6. Return total marks for students with marks greater than 60 after 20 marks have been added to those who scored less than 60

const results = students
    .map(student => {
        if (student.marks < 60) student.marks += 20;
        console.log(student)
        return student;
    })
    .filter(student => student.marks > 60)
    .reduce((acc, student) => student.marks + acc, 0)
console.log(results)