from _service.department import department_manager_service, department_service
from _service.employee import employee_service
from fastapi import HTTPException
from sqlalchemy.orm import Session
from schema.department import *

def add_manager(db:Session, emp_id: int, id: str):
    employee_info = employee_service.get_employee(db=db, id=emp_id)
    deapartment_info = department_service.get_dept(db, id)
    insert_data = DeptManagerCreate(
        emp_no=employee_info.emp_no,
        dept_no=deapartment_info.dept_no,
        from_date=employee_info.hire_date,
        to_date= "9999-01-01"

    )
    return department_manager_service.create(db, insert_data)

def list_manager(db: Session):
    managers= department_manager_service.get_all(db)
    return managers

def remove_manager(db: Session, emp_id: int):
    manager_info = department_manager_service.get(db, emp_id)
    return department_manager_service.remove(db=db,obj=manager_info)

def update_manager(data: DeptManagerUpdate, db: Session):
    manager_info = department_manager_service.get(db=db, id=data.emp_no)
    if (manager_info) is None:
        raise HTTPException(status_code=400, detail="Manager not found")
    return department_service.update(db, manager_info, data)

