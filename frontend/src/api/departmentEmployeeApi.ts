import api from './axios';
import { DeptEmp, DeptEmpUpdate } from '../types';

export const addDepartmentEmployee = async (emp_id: number, id: string): Promise<DeptEmp> => {
  const response = await api.post('/department_employee/', { emp_id, id });
  return response.data;
};

export const getAllDepartmentEmployees = async (limit: number, skip: number): Promise<DeptEmp[]> => {
  const response = await api.get(`/department_employee/all?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const deleteDepartmentEmployee = async (emp_id: number): Promise<void> => {
  await api.delete(`/department_employee/dept_emp?emp_id=${emp_id}`);
};

export const updateDepartmentEmployee = async (data: DeptEmpUpdate): Promise<DeptEmp> => {
  const response = await api.put('/department_employee/update', data);
  return response.data;
};