from _service.department import department_service, department_employee_service
from _service.employee import employee_service
from fastapi import HTTPException
from sqlalchemy.orm import Session
from schema.department import *

def add_dept_emp(db: Session, emp_id: int, id: str):
    employee_info = employee_service.get_employee(db=db, id=emp_id)
    department_info = department_service.get_dept(db, id)
    insert_data = DeptEmpCreate(
        emp_no=employee_info.emp_no,
        dept_no=department_info.dept_no,
        from_date=employee_info.hire_date,
        to_date="9999-01-01"
    )
    return department_employee_service.create(db, insert_data)

def list_dept_emp(db: Session, limit: int, skip: int):
    dept_emps = department_employee_service.get_multi(db=db, limit=limit, skip=skip)
    return dept_emps

def remove_dept_emp(db: Session, emp_id: int):
    dept_emp_info = department_service.get(db, emp_id)
    if dept_emp_info is None:
        raise HTTPException(status_code=404, detail="Department employee not found")
    return department_employee_service.remove(db=db, obj=dept_emp_info)

def update_dept_emp(data: DeptEmpUpdate, db: Session):
    dept_emp_info = department_service.get(db=db, id=data.emp_no)
    if dept_emp_info is None:
        raise HTTPException(status_code=404, detail="Department employee not found")
    return department_employee_service.update(db, dept_emp_info, data)