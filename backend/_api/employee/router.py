from fastapi import APIRouter, BackgroundTasks, Body, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from _api import deps
from schema.employee import *
from .service import *

router = APIRouter()

@router.get("/")
def get_employee(emp_id: int, db: Session = Depends(deps.get_db)):
    return get_info(emp_id, db)


@router.get("/total")
def get_total_employee(db: Session = Depends(deps.get_db)):
    return count_total(db)

@router.post("/create")
def create_employee_api(data: EmployeeCreate = Body(...), db: Session = Depends(deps.get_db)):
    return create_employee(data, db)

@router.put("/update")
def update_employee_api(data: EmployeeUpdate = Body(...),  db: Session = Depends(deps.get_db), emp_id: int = Body(...)):
    return update_employee(data, db, emp_id)

@router.delete("/delete")
def delete_employee_api(emp_id: int, db: Session = Depends(deps.get_db)):
    return remove_employee(emp_id, db)

@router.get("/all")
def get_all_employee_api(limit: int, skip: int, db: Session = Depends(deps.get_db)):
    employees = employee_service.get_multi(db=db, skip=skip, limit=limit)
    total = employee_service.count(db=db)
    return {"data": employees, "total": total}

@router.get("/count")
def get_employee_count(db: Session = Depends(deps.get_db)):
    return {"count": employee_service.count(db)}

@router.get("/name")
def get_by_name(name: str, db: Session = Depends(deps.get_db)):
    return find_by_name(name=name, db=db)


