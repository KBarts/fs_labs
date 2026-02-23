import { departments as seedDepartments } from '../data/departments';
import type { Department } from '../data/departments';

let departments: Department[] = structuredClone(seedDepartments);

function getDepartments() {
  return structuredClone(departments);
}

function createEmployee(input: {
  firstName: string;
  lastName: string;
  departmentName: string;
}) {
  const trimmedFirst = input.firstName.trim();
  const trimmedLast = input.lastName.trim();
  const trimmedDept = input.departmentName.trim();

  departments = departments.map((dept) => {
    if (dept.name !== trimmedDept) return dept;

    return {
      ...dept,
      employees: [...dept.employees, { firstName: trimmedFirst, lastName: trimmedLast }]
    };
  });

  return structuredClone(departments);
}

const employeeRepo = {
  getDepartments,
  createEmployee
};

export default employeeRepo;