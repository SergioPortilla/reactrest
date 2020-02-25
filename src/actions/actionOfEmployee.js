
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
      employeeName: employee.employeeName,
      employeeLastName: employee.employeeLastName,
      birthday: employee.birthday,
      entry: employee.entry,
      ceibaCoins: isDelete ? 0 : employee.ceibaCoins,
      state: isDelete ? false : true
    }),
    headers:{ 'Content-Type': 'application/json' }
  }).then(res => {return res.text()});
}

export function createEmployee(employee) {
  return fetch('http://localhost:8081/ceibacoins', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers:{ 'Content-Type': 'application/json' }
    }).then(res => {return res.text()})
    .catch(err => {return err })
}

export function findEmployee(nuip) {
  return fetch('http://localhost:8081/ceibacoins/'+nuip)
      .then(response => {return response.json()})
}

export function findAllEmployees() {
  return fetch('http://localhost:8081/ceibacoins')
      .then(response => response.json());
}
