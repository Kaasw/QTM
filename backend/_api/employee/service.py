from _service.employee import employee_service
from fastapi import HTTPException
from sqlalchemy.orm import Session
from schema.employee import *
from model.model import Employees
def get_info(emp_id: int, db: Session):
    employee= employee_service.get_employee(db=db, id=emp_id)
    if (employee) is None:
        raise HTTPException(status_code=400, detail="Employee not found")
    return employee

def create_employee(data: EmployeeCreate, db: Session):
    max_id = employee_service.get_max(db)
    data.emp_no = max_id + 1
    insert = EmployeeCreate(
        **data.dict()
    )
    return employee_service.create(db, insert)

def update_employee(data: EmployeeUpdate, db: Session, emp_id: int):
    employee_info = employee_service.get_employee(db=db, id=emp_id)
    if (employee_info) is None:
        raise HTTPException(status_code=400, detail="Employee not found")
    return employee_service.update(db, employee_info, data)

def remove_employee(emp_id: int, db: Session):
    employee = employee_service.get_employee(emp_id, db)
    if (employee) is None:
        raise HTTPException(status_code=400, detail="Employee not found")

    return employee_service.remove(db=db, obj=employee)

def count_total(db: Session):
    return employee_service.count(db)

def list_employee(db: Session, limit: int, skip: int):
    salaries = employee_service.get_multi(db=db, limit=limit, skip=skip)
    return salaries

def find_by_name(db: Session, name: str):
    query = db.query(Employees).filter(
        (Employees.first_name.ilike(f"%{name}%")) |
        (Employees.last_name.ilike(f"%{name}%"))
    )
    employees = query.all()
    return {"data": employees, "total": 20}