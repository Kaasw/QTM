import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import DepartmentList from './pages/DepartmentList';
import DepartmentForm from './pages/DepartmentForm';
import ManagerList from './pages/ManagerList';
import ManagerForm from './pages/ManagerForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          <Route path="employees">
            <Route index element={<EmployeeList />} />
            <Route path="new" element={<EmployeeForm />} />
            <Route path=":id/edit" element={<EmployeeForm />} />
          </Route>
          
          <Route path="departments">
            <Route index element={<DepartmentList />} />
            <Route path="new" element={<DepartmentForm />} />
            <Route path=":id/edit" element={<DepartmentForm />} />
          </Route>
          
          <Route path="managers">
            <Route index element={<ManagerList />} />
            <Route path="new" element={<ManagerForm />} />
            <Route path=":id/edit" element={<ManagerForm />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;