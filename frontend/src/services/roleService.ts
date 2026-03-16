import type { Role } from '../data/roles';

export interface CreateRoleInput {
  firstName: string;
  lastName: string;
  roleName: string;
}

export interface RoleRepo {
  getRoles(): Promise<Role[]>;
  createRole(input: CreateRoleInput): Promise<CreateRoleResult>;
}

export interface CreateRoleResult {
  roles?: Role[];
  firstNameMessages: string[];
  roleMessages: string[];
}

function roleService(repo: RoleRepo) {
  const createRole = async (input: CreateRoleInput): Promise<CreateRoleResult> => {
    return repo.createRole(input);
  };

  const getRoles = async () => {
    return repo.getRoles();
  };

  return { getRoles, createRole };
}

export default roleService;