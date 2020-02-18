export const newEmployee = [
  {
    nuip: 0,
    employeeName: '',
    employeeLastName: '',
    birthday: new Date(),
    entry: new Date(),
    ceibaCoins: 0,
    state: true
  },
];

export class employee {
  constructor(nuip, employeeName, employeeLastName, birthday, entry, ceibaCoins, state) {
    this.nuip = nuip;
    this.employeeName = employeeName;
    this.employeeLastName = employeeLastName;
    this.birthday = birthday;
    this.entry = entry;
    this.ceibaCoins = ceibaCoins;
    this.state = state;
  }
}
