import type { Department } from '../data/departments';

async function getDepartments() {
  const response = await fetch('http://localhost:3000/departments');
  const departments: Department[] = await response.json();
  return departments;
}

async function createEmployee(input: {
  firstName: string;
  lastName: string;
  departmentName: string;
}) {
  const response = await fetch('http://localhost:3000/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });

  const result = await response.json();
  return result;
}

const employeeRepo = {
  getDepartments,
  createEmployee
};

export default employeeRepo;