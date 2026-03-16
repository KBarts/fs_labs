import type { Role } from '../data/roles';

async function getRoles() {
  const response = await fetch('http://localhost:3000/roles');
  const roles: Role[] = await response.json();
  return roles;
}

async function createRole(input: {
  firstName: string;
  lastName: string;
  roleName: string;
}) {
  const response = await fetch('http://localhost:3000/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });

  const result = await response.json();
  return result;
}

const roleRepo = {
  getRoles,
  createRole
};

export default roleRepo;