function getStudentById() {
  currentEnrollment.find(function getStudentById(id) {
    return id === student.id;
  });
}
function printRecords(recordIds) {
  const arr = [];
  for (let id of recordIds) {
    studentRecords.find(function getStudentById(student) {
      if (student.id === id) {
        arr.push(student);
      }
    });
  }

  const sortedArr = arr.sort(function sortByName(a, b) {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return 1;
    } else if (nameA < nameB) {
      return -1;
    } else {
      return 0;
    }
  });

  sortedArr.forEach(function printRecord(el) {
    console.log(`${el.name} (${el.id}): ${el.paid ? "Paid" : "Not Paid"}`);
  });

  return sortedArr;
}

function paidStudentsToEnroll() {
  const toBeEnrolled = studentRecords.filter(function paidButNotEnrolled(
    student
  ) {
    return student.paid && !currentEnrollment.includes(student.id);
  });

  const toBeEnrolledIds = toBeEnrolled.map(function selectId(student) {
    return student.id;
  });

  return [...currentEnrollment, ...toBeEnrolledIds];
}

function remindUnpaid(recordIds) {
  const unpaid = studentRecords.filter(function selectUnpaid(student) {
    return !student.paid;
  });

  const unpaidEnrolled = unpaid.filter(function (student) {
    return recordIds.includes(student.id);
  });

  const unpaidEnrolledIds = unpaidEnrolled.map((student) => student.id);

  printRecords(unpaidEnrolledIds);
}

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
