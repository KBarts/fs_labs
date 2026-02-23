import type { Department } from '../data/departments';

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  departmentName: string;
}

export interface EmployeeRepo {
  getDepartments(): Department[];
  createEmployee(input: CreateEmployeeInput): Department[];
}

export interface CreateEmployeeResult {
  departments?: Department[];
  firstNameMessages: string[];
  departmentMessages: string[];
}

function employeeService(repo: EmployeeRepo) {
  const validate = (input: CreateEmployeeInput): CreateEmployeeResult => {
    const firstNameMessages: string[] = [];
    const departmentMessages: string[] = [];

    const trimmedFirst = input.firstName.trim();
    const trimmedDept = input.departmentName.trim();

    if (trimmedFirst.length < 3) {
      firstNameMessages.push('First Name must be at least 3 characters');
    }

    const departmentExists = repo
      .getDepartments()
      .some((d) => d.name === trimmedDept);

    if (!trimmedDept) {
      departmentMessages.push('Please select a Department.');
    } else if (!departmentExists) {
      departmentMessages.push('Employee must be added to existing Department');
    }

    return { firstNameMessages, departmentMessages };
  };

  const createEmployee = (input: CreateEmployeeInput): CreateEmployeeResult => {
    const result = validate(input);

    if (result.firstNameMessages.length > 0 || result.departmentMessages.length > 0) {
      return result;
    }

    const departments = repo.createEmployee({
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      departmentName: input.departmentName.trim()
    });

    return { departments, firstNameMessages: [], departmentMessages: [] };
  };

  return { validate, createEmployee };
}

export default employeeService;