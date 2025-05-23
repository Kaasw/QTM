import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDepartments, deleteDepartment } from '../api/departmentApi';
import { Department } from '../types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await getAllDepartments();
      setDepartments(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError('Failed to load departments. Please check your connection to the backend server.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        // Refresh the list
        fetchDepartments();
      } catch (err) {
        console.error('Error deleting department:', err);
        setError('Failed to delete department');
      }
    }
  };

  const filteredDepartments = departments.filter(department => 
    department.dept_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.dept_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading size="lg" text="Loading departments..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-gray-600">Manage your company departments</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search departments..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Link to="/departments/new">
            <Button variant="primary" className="whitespace-nowrap">
              <Plus size={16} className="mr-2" />
              Add Department
            </Button>
          </Link>
        </div>
      </div>

      {filteredDepartments.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">No departments found matching your search criteria.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dept. Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDepartments.map((department) => (
                  <tr key={department.dept_no} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {department.dept_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {department.dept_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/departments/${department.dept_no}/edit`}>
                          <Button variant="secondary" size="sm">
                            <Edit size={16} />
                          </Button>
                        </Link>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDelete(department.dept_no)}
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
        </div>
      )}
    </div>
  );
};

export default DepartmentList;