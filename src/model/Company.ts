import Department from "./Department";
import Employee from "./Employee";

export default class Company {
  name = "";
  address = "";
  bannerImage = "";

  departments: Department[] = [];
  employees: Employee[] = [];

  addEmployee(employee: Employee, department: Department) {
    this.addDepartment(department);

    const similarEmployeeExists = this.employees.find((e) =>
      e.isSimilarWith(e)
    );
    if (similarEmployeeExists) throw "Similar employee exists";

    this.employees.push(employee);
  }

  addDepartment(department: Department) {
    const deptExists = this.departments.find((d) => d.isEqualTo(department));
    if (deptExists) return;

    this.departments.push(department);
  }
}
