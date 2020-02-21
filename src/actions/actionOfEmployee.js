
export function updateCoinsEmployee() {
  return fetch('http://localhost:8081/ceibacoins', {
        method: 'PATCH'
      })
      .then(response => response.text())
      .then(text => {return text})
      .catch(error => console.log(error));
}
