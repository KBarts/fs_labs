import departmentRepo from "../repositories/departmentRepo";

async function getDepartments() {
  return departmentRepo.getDepartments();
}

async function createEmployee(input: {
  firstName: string;
  lastName: string;
  departmentName: string;
}) {
  const firstNameMessages: string[] = [];
  const departmentMessages: string[] = [];

  if (!input.firstName || input.firstName.length < 3) {
    firstNameMessages.push("First name must be at least 3 characters");
  }

  if (!input.departmentName) {
    departmentMessages.push("Department is required");
  }

  if (firstNameMessages.length > 0 || departmentMessages.length > 0) {
    return {
      firstNameMessages,
      departmentMessages
    };
  }

  const departments = await departmentRepo.addEmployee(input);

  return {
    departments,
    firstNameMessages,
    departmentMessages
  };
}

const departmentService = {
  getDepartments,
  createEmployee
};

export default departmentService;