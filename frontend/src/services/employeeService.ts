import type { Department } from '../data/departments';

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  departmentName: string;
}

export interface EmployeeRepo {
  getDepartments(): Promise<Department[]>;
  createEmployee(input: CreateEmployeeInput): Promise<CreateEmployeeResult>;
}

export interface CreateEmployeeResult {
  departments?: Department[];
  firstNameMessages: string[];
  departmentMessages: string[];
}

function employeeService(repo: EmployeeRepo) {
  const createEmployee = async (
    input: CreateEmployeeInput
  ): Promise<CreateEmployeeResult> => {
    return repo.createEmployee(input);
  };

  const getDepartments = async () => {
    return repo.getDepartments();
  };

  return { getDepartments, createEmployee };
}

export default employeeService;