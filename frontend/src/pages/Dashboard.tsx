import React, { useEffect, useState } from 'react';
import { getEmployeeCount } from '../api/employeeApi';
import { getDepartmentCount, getDepartmentOverview } from '../api/departmentApi';
import { getManagerCount } from '../api/departmentManagerApi';
import { getAverageSalary } from '../api/salaryApi';
import DashboardStats from '../components/DashboardStats';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Building2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [departmentCount, setDepartmentCount] = useState<number>(0);
  const [managerCount, setManagerCount] = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [avgSalary, setAvgSalary] = useState<string>('$0');
  const [departments, setDepartments] = useState<{ dept_name: string; employee_count: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch employee count
        const empCount = await getEmployeeCount();
        setEmployeeCount(empCount);

        // Fetch department count
        const deptCount = await getDepartmentCount();
        setDepartmentCount(deptCount);

        // Fetch manager count
        const mgrCount = await getManagerCount();
        setManagerCount(mgrCount);

        // Fetch average salary
        const avg = await getAverageSalary();
        setAvgSalary(`$${Math.round(avg).toLocaleString()}`);

        // Fetch department overview
        const deptOverview = await getDepartmentOverview(5, 0); // Limit to 5 for display
        setDepartments(deptOverview.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please check your connection to the backend server.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading size="lg" text="Loading dashboard data..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to the Employee Management System</p>

      <DashboardStats
        employeeCount={employeeCount}
        departmentCount={departmentCount}
        managerCount={managerCount}
        avgSalary={avgSalary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <Building2 className="mr-2 text-indigo-600" />
            <h2 className="text-xl font-semibold">Department Overview</h2>
          </div>
          <div className="space-y-4">
            {departments.length === 0 ? (
              <p className="text-gray-500">No departments available.</p>
            ) : (
              departments.map((dept) => (
                <div
                  key={dept.dept_name}
                  className="flex justify-between items-center pb-2 border-b border-gray-100"
                >
                  <span className="font-medium">{dept.dept_name}</span>
                  <span className="text-gray-600">{dept.employee_count} employees</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;