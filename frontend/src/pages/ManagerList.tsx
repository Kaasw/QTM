import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllManagers, deleteManager } from '../api/departmentManagerApi';
import { DeptManager } from '../types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ManagerList: React.FC = () => {
  const [managers, setManagers] = useState<DeptManager[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const data = await getAllManagers();
      setManagers(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching managers:', err);
      setError('Failed to load managers. Please check your connection to the backend server.');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchManagers();
  }, []);

  const handleDelete = async (empId: number) => {
    if (window.confirm('Are you sure you want to remove this manager?')) {
      try {
        await deleteManager(empId);
        fetchManagers();
      } catch (err) {
        console.error('Error deleting manager:', err);
        setError('Failed to delete manager');
      }
    }
  };

  const filteredManagers = managers.filter(manager => 
    manager.emp_no.toString().includes(searchTerm) ||
    manager.dept_no.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading size="lg" text="Loading managers..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Department Managers</h1>
          <p className="text-gray-600">Manage departmental leadership</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search managers..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Link to="/managers/new">
            <Button variant="primary" className="whitespace-nowrap">
              <Plus size={16} className="mr-2" />
              Assign Manager
            </Button>
          </Link>
        </div>
      </div>

      {filteredManagers.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">No managers found matching your search criteria.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredManagers.map((manager) => (
                  <tr key={`${manager.emp_no}-${manager.dept_no}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {manager.emp_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {manager.dept_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(manager.from_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(manager.to_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/managers/${manager.emp_no}/edit`}>
                          <Button variant="secondary" size="sm">
                            <Edit size={16} />
                          </Button>
                        </Link>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleDelete(manager.emp_no)}
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

export default ManagerList;