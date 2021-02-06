export default class Department {
  name = "";

  isEqualTo(other: Department): boolean {
    return this.name.toLowerCase() === other.name.toLowerCase();
  }
}
