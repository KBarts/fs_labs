import roleRepo from "../repositories/roleRepo";

async function getRoles() {
  return roleRepo.getRoles();
}

async function createRole(input: {
  firstName: string;
  lastName: string;
  roleName: string;
}) {
  const firstNameMessages: string[] = [];
  const roleMessages: string[] = [];

  if (!input.firstName || input.firstName.length < 3) {
    firstNameMessages.push("First name must be at least 3 characters");
  }

  if (!input.roleName) {
    roleMessages.push("Role is required");
  }

  if (firstNameMessages.length > 0 || roleMessages.length > 0) {
    return {
      firstNameMessages,
      roleMessages
    };
  }

  const roles = await roleRepo.addRole(input);

  return {
    roles,
    firstNameMessages,
    roleMessages
  };
}

const roleService = {
  getRoles,
  createRole
};

export default roleService;