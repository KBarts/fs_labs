import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Pixell River Employee Directory</h1>
        <p>Staff directory</p>
      </header>

      <nav className="app-nav">
        <NavLink to="/employees">Employees</NavLink>
        {' | '}
        <NavLink to="/organization">Organization</NavLink>
      </nav>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <span>Copyright Pixell River Financial {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default Layout;