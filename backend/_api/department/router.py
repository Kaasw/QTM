from fastapi import APIRouter, BackgroundTasks, Body, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import func
from model.model import Departments, DeptEmp
from _api import deps
from .service import *

router = APIRouter()

@router.get("/all")
def get_all_departments_api( db: Session = Depends(deps.get_db)):
    return get_all_departments(db)

@router.post("/create")
def create_department_api(data: DepartmentCreate = Body(...), db: Session = Depends(deps.get_db)):
    return create_department(data, db)

@router.get("/")
def get_department_api(id: str, db: Session = Depends(deps.get_db)):
    return get_department(id, db)

@router.put("/update")
def update_department_api(data: DepartmentUpdate = Body(...),  db: Session = Depends(deps.get_db)):
    return update_department(data, db)

@router.delete("/delete")
def delete_department_api(db: Session = Depends(deps.get_db), id: str = Body(...)):
    return remove_department(id=id, db=db)

@router.get("/overview")
def get_department_overview(limit: int = 10, skip: int = 0, db: Session = Depends(deps.get_db)):
    overview = (
        db.query(
            Departments.dept_name,
            func.count(DeptEmp.emp_no).label("employee_count")
        )
        .outerjoin(DeptEmp, Departments.dept_no == DeptEmp.dept_no)
        .group_by(Departments.dept_name)
        .offset(skip)
        .limit(limit)
        .all()
    )
    total = department_service.count(db)
    return {
        "data": [
            {"dept_name": dept_name, "employee_count": employee_count}
            for dept_name, employee_count in overview
        ],
        "total": total
    }
@router.get("/count")
def get_department_count(db: Session = Depends(deps.get_db)):
    return {"count": department_service.count(db)}