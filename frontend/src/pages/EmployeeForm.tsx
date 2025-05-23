import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee, createEmployee, updateEmployee } from '../api/employeeApi';
import { Employee, EmployeeCreate, EmployeeUpdate, Gender } from '../types';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, Save } from 'lucide-react';

const EmployeeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined && id !== 'new';
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({
    emp_no: 0,
    first_name: '',
    last_name: '',
    gender: Gender.M,
    birth_date: '',
    hire_date: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const data = await getEmployee(Number(id));
          setFormData({
            ...data,
            birth_date: new Date(data.birth_date).toISOString().split('T')[0],
            hire_date: new Date(data.hire_date).toISOString().split('T')[0]
          });
          setLoading(false);
        } catch (err) {
          console.error('Error fetching employee:', err);
          setError('Failed to load employee data');
          setLoading(false);
        }
      }
    };
    
    fetchEmployee();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditMode) {
      const updatePayload: EmployeeUpdate = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender as Gender,
        birth_date: formData.birth_date,
        hire_date: formData.hire_date
      };
      await updateEmployee(Number(id), updatePayload);
      } else {
        const createData: EmployeeCreate = {
          emp_no: Number(formData.emp_no),
          first_name: formData.first_name || '',
          last_name: formData.last_name || '',
          gender: formData.gender as Gender,
          birth_date: formData.birth_date || '',
          hire_date: formData.hire_date || ''
        };
        await createEmployee(createData);
      }
      
      setLoading(false);
      navigate('/employees');
    } catch (err) {
      console.error('Error saving employee:', err);
      setError('Failed to save employee data');
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <Loading size="lg" text="Loading employee data..." />;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/employees')}
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h1>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isEditMode && (
              <div>

              </div>
            )}
            
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                value={formData.first_name || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                value={formData.last_name || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender || Gender.M}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={Gender.M}>Male</option>
                <option value={Gender.F}>Female</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                required
                value={formData.birth_date || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700 mb-1">
                Hire Date
              </label>
              <input
                type="date"
                id="hire_date"
                name="hire_date"
                required
                value={formData.hire_date || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/employees')}
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
              {loading ? 'Saving...' : 'Save Employee'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;