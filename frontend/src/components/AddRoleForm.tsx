import useFormInput from '../hooks/useFormInput';
import roleRepo from '../repositories/roleRepo';
import roleService from '../services/roleService';
import type { Role } from '../data/roles';

const service = roleService(roleRepo);

interface AddRoleFormProps {
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}

function AddRoleForm({ setRoles }: AddRoleFormProps) {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const roleName = useFormInput('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    firstName.clearMessages();
    roleName.clearMessages();

    const result = await service.createRole({
      firstName: firstName.value,
      lastName: lastName.value,
      roleName: roleName.value
    });

    if (result.firstNameMessages.length > 0 || result.roleMessages.length > 0) {
      firstName.setMessages(result.firstNameMessages);
      roleName.setMessages(result.roleMessages);
      return;
    }

    if (result.roles) {
      setRoles(result.roles);
    }

    firstName.reset();
    lastName.reset();
    roleName.reset();
  };

  return (
    <section className="add-role">
      <h2>Add Role</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" value={firstName.value} onChange={firstName.onChange} />
          {firstName.messages.length > 0 && (
            <ul className="validation-messages">
              {firstName.messages.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" value={lastName.value} onChange={lastName.onChange} />
        </div>

        <div>
          <label htmlFor="roleName">Role</label>
          <input id="roleName" value={roleName.value} onChange={roleName.onChange} />
          {roleName.messages.length > 0 && (
            <ul className="validation-messages">
              {roleName.messages.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit">Add</button>
      </form>
    </section>
  );
}

export default AddRoleForm;