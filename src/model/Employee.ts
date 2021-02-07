export default class Employee {
  id = Employee.generateId();
  firstName = "";
  lastName = "";
  department = "";

  isSimilarWith(other: Employee): boolean {
    const str = `${this.firstName} ${this.lastName}`.toLowerCase();
    const otherStr = `${other.firstName} ${other.lastName}`.toLocaleLowerCase();

    return str === otherStr;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static counter = 0;
  private static generateId() {
    return Employee.counter++;
  }
}
