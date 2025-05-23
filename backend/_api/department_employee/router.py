from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from _api import deps
from .service import *

router = APIRouter()

@router.post("/")
def add_dept_emp_api(emp_id: int = Body(...), id: str = Body(...), db: Session = Depends(deps.get_db)):
    return add_dept_emp(emp_id=emp_id, id=id, db=db)

@router.get("/all")
def get_all_dept_emps_api(limit: int, skip:int, db: Session = Depends(deps.get_db)):
    return list_dept_emp(db=db, limit=limit, skip=skip)

@router.delete("/dept_emp")
def delete_dept_emp_api(emp_id: int, db: Session = Depends(deps.get_db)):
    return remove_dept_emp(emp_id=emp_id, db=db)

@router.put("/update")
def update_dept_emp_api(data: DeptEmpUpdate = Body(...), db: Session = Depends(deps.get_db)):
    return update_dept_emp(data, db)