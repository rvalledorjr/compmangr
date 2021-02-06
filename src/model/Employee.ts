import Department from "./Department";

export default class Employee {
  id = "";
  firstName = "";
  lastName = "";
  department: Department | null = null;

  isSimilarWith(other: Employee): boolean {
    const str = `${this.firstName} ${this.lastName} ${this.department}`.toLowerCase();
    const otherStr = `${this.firstName} ${this.lastName} ${this.department}`.toLocaleLowerCase();

    return str === otherStr;
  }
}
