import './App.css';
import { departments } from './data/departments';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Pixell River Employee Directory</h1>
        <p>Welcome to staff directory</p>
      </header>

      <main className="app-main">
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
      </main>

      <footer className="app-footer">
        <span>
          Copyright Pixell River Financial {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}

export default App;