import api from './axios';
import { DeptManager, DeptManagerUpdate } from '../types';

export const addManager = async (emp_id: number, id: string): Promise<DeptManager> => {
  const response = await api.post('/department_manager/', { emp_id, id });
  return response.data;
};

export const getAllManagers = async (): Promise<DeptManager[]> => {
  const response = await api.get('/department_manager/all');
  return response.data;
};

export const deleteManager = async (emp_id: number): Promise<void> => {
  await api.delete(`/department_manager/manager?emp_id=${emp_id}`);
};

export const updateManager = async (data: DeptManagerUpdate): Promise<DeptManager> => {
  const response = await api.put('/department_manager/update', data);
  return response.data;
};


export const getManagerCount = async (): Promise<number> => {
  const response = await api.get('/department_manager/count');
  return response.data.count;
};

