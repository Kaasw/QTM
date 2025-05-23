import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addManager, updateManager } from '../api/departmentManagerApi';
import { getAllDepartments } from '../api/departmentApi';
import { Department, DeptManagerUpdate } from '../types';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, Save } from 'lucide-react';

const ManagerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined && id !== 'new';
  
  const [loading, setLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    emp_no: number;
    dept_no: string;
    from_date: string;
    to_date: string;
  }>({
    emp_no: 0,
    dept_no: '',
    from_date: new Date().toISOString().split('T')[0],
    to_date: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const depts = await getAllDepartments();
        setDepartments(depts);
        
        if (isEditMode) {
          // In a real app, you would fetch the manager data here
          // But there's no endpoint to get a single manager by emp_id
          // so we'll just set the emp_no from the URL
          setFormData(prev => ({
            ...prev,
            emp_no: Number(id)
          }));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'emp_no' ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditMode) {
        const updateData: DeptManagerUpdate = {
          emp_no: formData.emp_no,
          dept_no: formData.dept_no,
          from_date: formData.from_date,
          to_date: formData.to_date
        };
        await updateManager(updateData);
      } else {
        await addManager(formData.emp_no, formData.dept_no);
      }
      
      setLoading(false);
      navigate('/managers');
    } catch (err) {
      console.error('Error saving manager:', err);
      setError('Failed to save manager data');
      setLoading(false);
    }
  };

  if (loading && departments.length === 0) {
    return <Loading size="lg" text="Loading data..." />;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/managers')}
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Manager Assignment' : 'Assign New Manager'}</h1>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="emp_no" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <input
                type="number"
                id="emp_no"
                name="emp_no"
                required
                value={formData.emp_no || ''}
                onChange={handleChange}
                disabled={isEditMode}
                className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isEditMode ? 'bg-gray-100' : ''}`}
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter the employee ID of the manager
              </p>
            </div>
            
            <div>
              <label htmlFor="dept_no" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="dept_no"
                name="dept_no"
                required
                value={formData.dept_no}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a department</option>
                {departments.map(dept => (
                  <option key={dept.dept_no} value={dept.dept_no}>
                    {dept.dept_name} ({dept.dept_no})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="from_date" className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                id="from_date"
                name="from_date"
                required
                value={formData.from_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="to_date" className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                id="to_date"
                name="to_date"
                required
                value={formData.to_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/managers')}
              className="mr-4"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >
              <Save size={16} className="mr-2" />
              {loading ? 'Saving...' : isEditMode ? 'Update Assignment' : 'Assign Manager'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerForm;