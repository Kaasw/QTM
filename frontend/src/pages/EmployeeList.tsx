import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees, deleteEmployee, searchEmployeesByName, EmployeeListResponse } from '../api/employeeApi';
import { Employee, Gender } from '../types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // 10 employees per page
  const [total, setTotal] = useState<number>(0); // Total number of employees
  const [isSearching, setIsSearching] = useState<boolean>(false); // Track search mode

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        let employeesData: Employee[];
        let totalCount: number;

        if (searchTerm.trim()) {
          // Search by name
          setIsSearching(true);
          employeesData = await searchEmployeesByName(searchTerm);
          totalCount = employeesData.length; // Total is the length of the array
        } else {
          // Fetch paginated employees
          setIsSearching(false);
          const skip = (page - 1) * limit;
          const response: EmployeeListResponse = await getAllEmployees(limit, skip);
          employeesData = response.data; // Extract the 'data' property
          totalCount = response.total;
        }

        setEmployees(employeesData || []); // Ensure employees is always an array
        setTotal(totalCount);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employees. Please check your connection to the backend server.');
        setEmployees([]); // Reset to empty array on error
        setTotal(0);
        setLoading(false);
      }
    };

    // Debounce search
    const debounceTimeout = setTimeout(() => {
      fetchEmployees();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [page, limit, searchTerm]);

  const handleDelete = async (empId: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(empId);
        // Refetch data
        let employeesData: Employee[];
        let totalCount: number;
        if (searchTerm.trim()) {
          employeesData = await searchEmployeesByName(searchTerm);
          totalCount = employeesData.length;
        } else {
          const skip = (page - 1) * limit;
          const response: EmployeeListResponse = await getAllEmployees(limit, skip);
          employeesData = response.data; // Extract the 'data' property
          totalCount = response.total;
        }
        setEmployees(employeesData || []);
        setTotal(totalCount);
        // Adjust page if necessary in non-search mode
        if (!searchTerm.trim() && employeesData.length === 0 && page > 1) {
          setPage(page - 1);
        }
      } catch (err) {
        console.error('Error deleting employee:', err);
        setError('Failed to delete employee');
      }
    }
  };

  // Pagination logic (only for non-search mode)
  const totalPages = Math.ceil(total / limit);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      if (page > totalPages - 3) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      }
      if (page < 4) {
        startPage = 2;
        endPage = 4;
      }

      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return <Loading size="lg" text="Loading employees..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-gray-600">Manage your employee records</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees by name..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link to="/employees/new">
            <Button variant="primary" className="whitespace-nowrap">
              <Plus size={16} className="mr-2" />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">
            {searchTerm.trim()
              ? 'No employees found matching your search criteria.'
              : 'No employees found.'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Birth Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hire Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.emp_no} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.emp_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.first_name} {employee.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.gender === Gender.M ? 'Male' : 'Female'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.birth_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.hire_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/employees/${employee.emp_no}/edit`}>
                          <Button variant="secondary" size="sm">
                            <Edit size={16} />
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(employee.emp_no)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls (only for non-search mode) */}
          {!isSearching && totalPages > 1 && (
            <div className="flex justify-center items-center px-6 py-4 bg-gray-50 space-x-2">
              {getPageNumbers().map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === '...' ? (
                    <span className="px-3 py-1 text-gray-500">...</span>
                  ) : (
                    <Button
                      variant={pageNum === page ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setPage(pageNum as number)}
                      disabled={pageNum === page}
                    >
                      {pageNum}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;