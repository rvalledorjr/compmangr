import Employee from "./Employee";

export default class Company {
  id = Company.generateId();
  name = "";
  address = "";
  bannerImage = "";

  employees: Employee[] = [];

  get departments(): string[] {
    const deptSet = new Set(this.employees.map((e) => e.department));
    return [...deptSet];
  }

  employeeWithId(id: number): Employee | undefined {
    return this.employees.find((e) => e.id === id);
  }

  similarEmployeeExists(employee: Employee): boolean {
    return !!this.employees.find((e) => e.isSimilarWith(employee));
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }
  deleteEmployee(employee: Employee) {
    const i = this.employees.indexOf(employee);
    this.employees.splice(i, 1);
  }

  deleteDepartment(department: string) {
    const remainingEmployees = this.employees.filter(
      (e) => e.department !== department
    );
    this.employees = remainingEmployees;
  }

  static counter = 0;
  private static generateId() {
    return Company.counter++;
  }
}
