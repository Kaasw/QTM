import api from './axios';
import { Title, TitleUpdate } from '../types';

export const addTitle = async (emp_id: number, title: string): Promise<Title> => {
  const response = await api.post('/employee_title/', { emp_id, title });
  return response.data;
};

export const getAllTitles = async (limit: number, skip: number): Promise<Title[]> => {
  const response = await api.get(`/employee_title/all?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const deleteTitle = async (emp_id: number): Promise<void> => {
  await api.delete(`/employee_title/title?emp_id=${emp_id}`);
};

export const updateTitle = async (data: TitleUpdate): Promise<Title> => {
  const response = await api.put('/employee_title/update', data);
  return response.data;
};