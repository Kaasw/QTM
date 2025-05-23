from _service.department import department_service
from fastapi import HTTPException
from sqlalchemy.orm import Session
from schema.department import *

def get_all_departments(db: Session):
    departments= department_service.get_all(db)
    return departments

def create_department(data: DepartmentCreate, db: Session):
    return department_service.create(db, data)

def get_department(dept_id: str, db: Session):
    department= department_service.get_dept(db=db, id=dept_id)
    if (department) is None:
        raise HTTPException(status_code=400, detail="Department not found")
    return department

def update_department(data: DepartmentUpdate, db: Session):
    deapartment_info = department_service.get_dept(db=db, id=data.dept_no)
    if (deapartment_info) is None:
        raise HTTPException(status_code=400, detail="Department not found")
    return department_service.update(db, deapartment_info, data)

def remove_department(id: str, db: Session):
    department = department_service.get_dept(id=id, db=db)
    if (department) is None:
        raise HTTPException(status_code=400, detail="Department not found")

    return department_service.remove(db=db, obj=department)
