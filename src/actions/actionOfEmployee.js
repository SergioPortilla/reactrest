
export function updateCoinsEmployee() {
  return fetch('http://localhost:8081/ceibacoins', {
        method: 'PATCH'
      })
      .then(response => response.text())
      .then(text => {return text})
      .catch(error => console.log(error));
}

export function editEmployee(employee, isDelete) {
  return fetch('http://localhost:8081/ceibacoins', {
    method: 'PUT',
    body: JSON.stringify({
      nuip: employee.nuip,
      employeeName: employee.employeeLastName,
      employeeLastName: employee.employeeLastName,
      birthday: employee.birthday,
      entry: employee.entry,
      ceibaCoins: isDelete ? 0 : employee.ceibaCoins,
      state: isDelete ? false : true
    }),
    headers:{ 'Content-Type': 'application/json' }
  }).then(res => {return res.text()});
}