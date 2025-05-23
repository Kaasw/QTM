from _service.employee import employee_service, employee_title_service
from fastapi import HTTPException
from sqlalchemy.orm import Session
from schema.employee import *

def add_title(db: Session, emp_id: int, title: str):
    employee_info = employee_service.get_employee(db=db, id=emp_id)
    if employee_info is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    insert_data = TitleCreate(
        emp_no=employee_info.emp_no,
        title=title,
        from_date=employee_info.hire_date,
        to_date="9999-01-01"
    )
    return employee_title_service.create(db, insert_data)

def list_titles(db: Session, limit: int, skip: int):
    titles = employee_service.get_multi(db=db, limit=limit, skip=skip)
    return titles

def remove_title(db: Session, emp_id: int):
    title_info = employee_service.get(db, emp_id)
    if title_info is None:
        raise HTTPException(status_code=404, detail="Title record not found")
    return employee_service.remove(db=db, obj=title_info)

def update_title(data: TitleUpdate, db: Session):
    title_info = employee_service.get(db=db, id=data.emp_no)
    if title_info is None:
        raise HTTPException(status_code=404, detail="Title record not found")
    return employee_service.update(db, title_info, data)