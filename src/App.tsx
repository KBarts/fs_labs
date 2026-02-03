import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/employees" replace />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="organization" element={<OrganizationPage />} />
      </Route>
    </Routes>
  );
}

export default App;