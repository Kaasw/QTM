import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDepartment, createDepartment, updateDepartment } from '../api/departmentApi';
import { Department, DepartmentCreate, DepartmentUpdate } from '../types';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, Save } from 'lucide-react';

const DepartmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined && id !== 'new';

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Department>>({
    dept_no: '',
    dept_name: ''
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      if (isEditMode && id) {
        try {
          setLoading(true);
          const data = await getDepartment(id);
          setFormData(data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching department:', err);
          setError('Failed to load department data');
          setLoading(false);
        }
      }
    };

    fetchDepartment();
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditMode && id) {
        const updateData: DepartmentUpdate = {
          dept_no: id, // Include dept_no for backend
          dept_name: formData.dept_name || ''
        };
        await updateDepartment(id, updateData);
      } else {
        const createData: DepartmentCreate = {
          dept_no: formData.dept_no || '',
          dept_name: formData.dept_name || ''
        };
        await createDepartment(createData);
      }

      setLoading(false);
      navigate('/departments');
    } catch (err) {
      console.error('Error saving department:', err);
      setError('Failed to save department data');
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <Loading size="lg" text="Loading department data..." />;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-6">
        <Button
          variant="secondary"
          onClick={() => navigate('/departments')}
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Department' : 'Add New Department'}</h1>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {!isEditMode && (
              <div>
                <label htmlFor="dept_no" className="block text-sm font-medium text-gray-700 mb-1">
                  Department ID
                </label>
                <input
                  type="text"
                  id="dept_no"
                  name="dept_no"
                  required
                  maxLength={4}
                  value={formData.dept_no || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. D001"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Department ID must be a unique 4-character code
                </p>
              </div>
            )}

            <div>
              <label htmlFor="dept_name" className="block text-sm font-medium text-gray-700 mb-1">
                Department Name
              </label>
              <input
                type="text"
                id="dept_name"
                name="dept_name"
                required
                value={formData.dept_name || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/departments')}
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
              {loading ? 'Saving...' : 'Save Department'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;