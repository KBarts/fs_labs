import { roles } from '../data/roles';
import type { Role } from '../data/roles';

function OrganizationPage() {
  return (
    <section className="organization">
      <h2>Organization</h2>

      <ul className="role-list">
        {roles.map((r: Role) => (
          <li key={`${r.roleName}-${r.firstName}-${r.lastName}`} className="role-row">
            <span className="role-person">
              {r.firstName} {r.lastName}
            </span>
            <span className="role-title">{r.roleName}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default OrganizationPage;