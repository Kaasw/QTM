from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from _api import deps
from .service import *
from model.model import Salaries
from sqlalchemy import func

router = APIRouter()

@router.post("/")
def add_salary_api(emp_id: int = Body(...), salary: int = Body(...), db: Session = Depends(deps.get_db)):
    return add_salary(emp_id=emp_id, salary=salary, db=db)

@router.get("/all")
def get_all_salaries_api(limit: int, skip:int, db: Session = Depends(deps.get_db)):
    return list_salaries(db=db, limit=limit, skip=skip)

@router.delete("/salary")
def delete_salary_api(emp_id: int, db: Session = Depends(deps.get_db)):
    return remove_salary(emp_id=emp_id, db=db)

@router.put("/update")
def update_salary_api(data: SalaryUpdate = Body(...), db: Session = Depends(deps.get_db)):
    return update_salary(data, db)

@router.get("/average")
def get_average_salary(db: Session = Depends(deps.get_db)):
    avg_salary = db.query(func.avg(Salaries.salary)).scalar() or 0
    return {"average": float(avg_salary)}