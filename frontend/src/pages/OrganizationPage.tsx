import { useEffect, useState } from 'react';
import type { Role } from '../data/roles';
import AddRoleForm from '../components/AddRoleForm';
import roleRepo from '../repositories/roleRepo';
import roleService from '../services/roleService';

const service = roleService(roleRepo);

function OrganizationPage() {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      const data = await service.getRoles();
      setRoles(data);
    };

    loadRoles();
  }, []);

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