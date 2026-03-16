import type { Role } from '../data/roles';

export interface CreateRoleInput {
  firstName: string;
  lastName: string;
  roleName: string;
}

export interface RoleRepo {
  getRoles(): Role[];
  createRole(input: CreateRoleInput): Role[];
}

export interface CreateRoleResult {
  roles?: Role[];
  firstNameMessages: string[];
  roleMessages: string[];
}

function roleService(repo: RoleRepo) {
  const validate = (input: CreateRoleInput): CreateRoleResult => {
    const firstNameMessages: string[] = [];
    const roleMessages: string[] = [];

    const trimmedFirst = input.firstName.trim();
    const trimmedRole = input.roleName.trim();

    if (trimmedFirst.length < 3) {
      firstNameMessages.push('First Name must be at least 3 characters');
    }

    const roleTaken = repo
      .getRoles()
      .some((role) => role.roleName === trimmedRole);

    if (!trimmedRole) {
      roleMessages.push('Role is required');
    } else if (roleTaken) {
      roleMessages.push('A person cannot be created for an occupied Role');
    }

    return { firstNameMessages, roleMessages };
  };

  const createRole = (input: CreateRoleInput): CreateRoleResult => {
    const result = validate(input);

    if (result.firstNameMessages.length > 0 || result.roleMessages.length > 0) {
      return result;
    }

    const roles = repo.createRole({
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      roleName: input.roleName.trim()
    });

    return { roles, firstNameMessages: [], roleMessages: [] };
  };

  return { validate, createRole };
}

export default roleService;