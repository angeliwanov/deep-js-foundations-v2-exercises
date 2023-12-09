console.log(teacher);
var teacher = "Kyle";

otherteacher();
function otherteacher() {
  console.log(teacher); //undefined
  var teacher = "Suzy";
}
