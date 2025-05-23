import api from './axios';
import { Salary, SalaryUpdate } from '../types';

export const addSalary = async (emp_id: number, salary: number): Promise<Salary> => {
  const response = await api.post('/salary/', { emp_id, salary });
  return response.data;
};

export const getAllSalaries = async (limit: number, skip: number): Promise<Salary[]> => {
  const response = await api.get(`/salary/all?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const deleteSalary = async (emp_id: number): Promise<void> => {
  await api.delete(`/salary/salary?emp_id=${emp_id}`);
};

export const updateSalary = async (data: SalaryUpdate): Promise<Salary> => {
  const response = await api.put('/salary/update', data);
  return response.data;
};

export const getAverageSalary = async (): Promise<number> => {
  const response = await api.get('/salary/average');
  return response.data.average;
};