import { useMemo, useState } from 'react';
import { departments as initialDepartments } from '../data/departments';
import type { Department } from '../data/departments';

function EmployeesPage() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const [validationMessages, setValidationMessages] = useState<string[]>([]);

  const departmentOptions = useMemo(
    () => departments.map((d) => d.name),
    [departments]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: string[] = [];

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedDept = departmentName.trim();

    if (trimmedFirst.length < 3) {
      errors.push('First Name must be at least 3 characters');
    }

    if (!trimmedDept) {
      errors.push('Please select a Department.');
    } else if (!departmentOptions.includes(trimmedDept)) {
      errors.push('Employee must be added to existing Department');
    }

    if (errors.length > 0) {
      setValidationMessages(errors);
      return;
    }

    setValidationMessages([]);

    setDepartments((prev) =>
      prev.map((dept) => {
        if (dept.name !== trimmedDept) return dept;

        return {
          ...dept,
          employees: [...dept.employees, { firstName: trimmedFirst, lastName: trimmedLast }]
        };
      })
    );

    setFirstName('');
    setLastName('');
    setDepartmentName('');
  };

  return (
    <>
      {departments.map((dept) => (
        <section key={dept.name} className="department">
          <h2>{dept.name}</h2>

          <ul>
            {dept.employees.map((emp) => (
              <li key={`${emp.firstName}-${emp.lastName}`}>
                {emp.firstName} {emp.lastName}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="add-employee">
        <h2>Add Employee</h2>

        {validationMessages.length > 0 && (
          <ul className="validation-messages">
            {validationMessages.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            >
              <option value="">Select department</option>
              {departmentOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Add</button>
        </form>
      </section>
    </>
  );
}

export default EmployeesPage;