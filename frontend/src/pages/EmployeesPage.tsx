import { useEffect, useState } from 'react';
import type { Department } from '../data/departments';
import useFormInput from '../hooks/useFormInput';
import employeeRepo from '../repositories/employeeRepo';
import employeeService from '../services/employeeService';

const service = employeeService(employeeRepo);

function EmployeesPage() {
  const [departments, setDepartments] = useState<Department[]>([]);

  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const departmentName = useFormInput('');

  useEffect(() => {
    const loadDepartments = async () => {
      const data = await service.getDepartments();
      setDepartments(data);
    };

    loadDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    firstName.clearMessages();
    departmentName.clearMessages();

    const result = await service.createEmployee({
      firstName: firstName.value,
      lastName: lastName.value,
      departmentName: departmentName.value
    });

    if (result.firstNameMessages.length > 0 || result.departmentMessages.length > 0) {
      firstName.setMessages(result.firstNameMessages);
      departmentName.setMessages(result.departmentMessages);
      return;
    }

    if (result.departments) {
      setDepartments(result.departments);
    }

    firstName.reset();
    lastName.reset();
    departmentName.reset();
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
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={departmentName.value}
              onChange={departmentName.onChange}
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            {departmentName.messages.length > 0 && (
              <ul className="validation-messages">
                {departmentName.messages.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit">Add</button>
        </form>
      </section>
    </>
  );
}

export default EmployeesPage;