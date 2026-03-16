import { useState } from 'react';
import type { Role } from '../data/roles';
import AddRoleForm from '../components/AddRoleForm';
import roleRepo from '../repositories/roleRepo';

function OrganizationPage() {
  const [roles, setRoles] = useState<Role[]>(roleRepo.getRoles());

  return (
    <>
      <section className="organization">
        <h2>Organization</h2>

        <ul className="role-list">
          {roles.map((r) => (
            <li key={`${r.roleName}-${r.firstName}-${r.lastName}`} className="role-row">
              <span className="role-person">
                {r.firstName} {r.lastName}
              </span>
              <span className="role-title">{r.roleName}</span>
            </li>
          ))}
        </ul>
      </section>

      <AddRoleForm setRoles={setRoles} />
    </>
  );
}

export default OrganizationPage;