export enum Gender {
  M = "M",
  F = "F"
}

export interface Employee {
  emp_no: number;
  birth_date: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  hire_date: string;
  dept_emp?: DeptEmp[];
  dept_manager?: DeptManager[];
  titles?: Title[];
  salaries?: Salary[];
}

export interface EmployeeCreate {
  emp_no: number;
  birth_date: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  hire_date: string;
}

export interface EmployeeUpdate {
  birth_date?: string;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  hire_date?: string;
}

export interface Department {
  dept_no: string;
  dept_name: string;
  dept_emp?: DeptEmp[];
  dept_manager?: DeptManager[];
}

export interface DepartmentCreate {
  dept_no: string;
  dept_name: string;
}

export interface DepartmentUpdate {
  dept_no: string;
  dept_name?: string;
}

export interface DeptManager {
  emp_no: number;
  dept_no: string;
  from_date: string;
  to_date: string;
  employee?: Employee;
  department?: Department;
}

export interface DeptManagerUpdate {
  emp_no: number;
  dept_no: string;
  from_date?: string;
  to_date?: string;
}

export interface DeptEmp {
  emp_no: number;
  dept_no: string;
  from_date: string;
  to_date: string;
  employee?: Employee;
  department?: Department;
}

export interface DeptEmpUpdate {
  emp_no: number;
  dept_no: string;
  from_date?: string;
  to_date?: string;
}

export interface Title {
  emp_no: number;
  title: string;
  from_date: string;
  to_date: string;
  employee?: Employee;
}

export interface TitleUpdate {
  emp_no: number;
  title?: string;
  from_date?: string;
  to_date?: string;
}

export interface Salary {
  emp_no: number;
  salary: number;
  from_date: string;
  to_date: string;
  employee?: Employee;
}

export interface SalaryUpdate {
  emp_no: number;
  salary?: number;
  from_date?: string;
  to_date?: string;
}

export interface DepartmentOverviewItem {
  dept_name: string;
  employee_count: number;
}

export interface DepartmentOverviewResponse {
  data: DepartmentOverviewItem[];
  total: number;
}