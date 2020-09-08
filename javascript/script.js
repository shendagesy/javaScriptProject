let globalData;

function csvJSON(csv) {

  var lines = csv

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }
  globalData = result;
  //return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}

function Upload() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof (FileReader) != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var table = document.createElement("table");
        var rows = e.target.result.split("\n");
        csvJSON(rows);
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          if (cells.length > 1) {
            var row = table.insertRow(-1);
            for (var j = 0; j < cells.length; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = cells[j];
            }
          }
        }
        var dvCSV = document.getElementById("dvCSV");
        dvCSV.innerHTML = "";
        dvCSV.appendChild(table);
      }
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}
//Display all Employee names who are in department 

 function showAllEmployeesByDept(deptName) {
   let employees = globalData.filter(dept => dept.DEPT === deptName);
   console.log("Q1Result", employees);
   var Q1Result = document.getElementById('Q1Result');
   employees.forEach(emplyee => {
     var empCell = document.createElement("div");
     empCell.innerHTML = emplyee.DEPT + " = " + emplyee.LAST_NAME + " " + emplyee.FIRST_NAME + " " + emplyee.MID_INIT;
     Q1Result.appendChild(empCell);
     console.table(empCell)
   });
 } 

 //Display all Employee LEVEL per department. 

 function showAllEmployeeslevelByDept(deptName) {
  console.log("globalData", globalData);
  let dept = [];
  for(let i=0;i<globalData.length;i++){
    if(dept.indexOf(globalData[i].DEPT) === -1) {
      dept.push(globalData[i].DEPT)
    }
  }
  
 let Temp = []
  for(let i=0;i<dept.length;i++){
    let st;
    for(let j=0;j<globalData.length;j++){
     if(dept[i] === globalData[j].DEPT){
             if(st){
        st = st + " ," + globalData[j]["EMP_LEVEL\r"]
       } else {
        st =  globalData[j]["EMP_LEVEL\r"]
       }
     
     }
    }
    Temp.push({ key : dept[i], value : st})
  }

  console.log("dept[i", Temp);
  var Q1Result = document.getElementById('Q2Result');
  Temp.forEach(emplyee => {
    var empCell = document.createElement("div");
    empCell.innerHTML = emplyee.key + "=" + emplyee.value
    Q1Result.appendChild(empCell);
  });
} 






