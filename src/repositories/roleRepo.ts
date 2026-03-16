import { roles as seedRoles } from '../data/roles';
import type { Role } from '../data/roles';

let roles: Role[] = structuredClone(seedRoles);

function getRoles() {
  return structuredClone(roles);
}

function createRole(input: {
  firstName: string;
  lastName: string;
  roleName: string;
}) {
  const trimmedFirst = input.firstName.trim();
  const trimmedLast = input.lastName.trim();
  const trimmedRole = input.roleName.trim();

  roles = [
    ...roles,
    {
      firstName: trimmedFirst,
      lastName: trimmedLast,
      roleName: trimmedRole
    }
  ];

  return structuredClone(roles);
}

const roleRepo = {
  getRoles,
  createRole
};

export default roleRepo;