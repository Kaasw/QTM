from _service.employee import employee_salary_service, employee_service
from fastapi import HTTPException
from sqlalchemy.orm import Session
from schema.employee import *

def add_salary(db: Session, emp_id: int, salary: int):
    employee_info = employee_service.get_employee(db=db, id=emp_id)
    if employee_info is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    insert_data = SalaryCreate(
        emp_no=employee_info.emp_no,
        salary=salary,
        from_date=employee_info.hire_date,
        to_date="9999-01-01"
    )
    return employee_salary_service.create(db, insert_data)

def list_salaries(db: Session, limit: int, skip: int):
    salaries = employee_salary_service.get_multi(db=db, limit=limit, skip=skip)
    return salaries

def remove_salary(db: Session, emp_id: int):
    salary_info = employee_salary_service.get(db, emp_id)
    if salary_info is None:
        raise HTTPException(status_code=404, detail="Salary record not found")
    return employee_salary_service.remove(db=db, obj=salary_info)

def update_salary(data: SalaryUpdate, db: Session):
    salary_info = employee_salary_service.get(db=db, id=data.emp_no)
    if salary_info is None:
        raise HTTPException(status_code=404, detail="Salary record not found")
    return employee_salary_service.update(db, salary_info, data)