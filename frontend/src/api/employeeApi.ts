import api from './axios';
import { Employee, EmployeeCreate, EmployeeUpdate } from '../types';

export interface EmployeeListResponse {
  data: Employee[];
  total: number;
}
export const getEmployee = async (emp_id: number): Promise<Employee> => {
  const response = await api.get(`/employee?emp_id=${emp_id}`);
  return response.data;
};

export const createEmployee = async (data: EmployeeCreate): Promise<Employee> => {
  const response = await api.post('/employee/create', data);
  return response.data;
};

export const updateEmployee = async (emp_id: number, data: EmployeeUpdate): Promise<Employee> => {
  const payload = {
    data: { ...data },
    emp_id
  };
  const response = await api.put('/employee/update', payload);
  return response.data;
};

export const deleteEmployee = async (emp_id: number): Promise<void> => {
  await api.delete('/employee/delete', { data: { emp_id } });
};

export const getAllEmployees = async (limit: number, skip: number): Promise<Employee[]> => {
  const response = await api.get('/employee/all', { params: { limit, skip } });
  return response.data;
};

export const getEmployeeCount = async (): Promise<number> => {
  const response = await api.get('/employee/count');
  return response.data.count;
};

export const searchEmployeesByName = async (name: string): Promise<EmployeeListResponse> => {
  const response = await api.get('/employee/name', {
    params: { name },
  });
  return response.data;
};