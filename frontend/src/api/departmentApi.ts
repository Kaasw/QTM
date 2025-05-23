import api from './axios';
import { Department, DepartmentCreate, DepartmentUpdate } from '../types';

interface DepartmentOverviewItem {
  dept_name: string;
  employee_count: number;
}

interface DepartmentOverviewResponse {
  data: DepartmentOverviewItem[];
  total: number;
}

export const getAllDepartments = async (): Promise<Department[]> => {
  const response = await api.get('/department/all');
  return response.data;
};

export const getDepartment = async (id: string): Promise<Department> => {
  const response = await api.get(`/department?id=${id}`);
  return response.data;
};

export const createDepartment = async (data: DepartmentCreate): Promise<Department> => {
  const response = await api.post('/department/create', data);
  return response.data;
};

export const updateDepartment = async (id: string, data: DepartmentUpdate): Promise<Department> => {
  const payload = { ...data, dept_no: id }; 
  const response = await api.put('/department/update', payload);
  return response.data;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  await api.delete('/department/delete', { data: { id } });
};

export const getDepartmentCount = async (): Promise<number> => {
  const response = await api.get('/department/count');
  return response.data.count;
};

export const getDepartmentOverview = async (limit: number, skip: number): Promise<DepartmentOverviewResponse> => {
  const response = await api.get('/department/overview', { params: { limit, skip } });
  return response.data;
};