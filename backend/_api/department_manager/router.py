from fastapi import APIRouter, BackgroundTasks, Body, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from _api import deps
from .service import *

router = APIRouter()

@router.post("/")
def add_manager_api(emp_id: int = Body(...), id: str = Body(...), db: Session = Depends(deps.get_db)):
    return add_manager(emp_id=emp_id, id=id, db=db)

@router.get("/all")
def get_all_managers_api( db: Session = Depends(deps.get_db)):
    return list_manager(db)

@router.delete("/manager")
def delete_manager_api(emp_id: int , db: Session = Depends(deps.get_db)):
    return remove_manager(emp_id=emp_id, db=db)

@router.put("/update")
def update_manager_api(data: DeptManagerUpdate = Body(...),  db: Session = Depends(deps.get_db),):
    return update_manager(data, db)

@router.get("/count")
def get_manager_count(db: Session = Depends(deps.get_db)):
    return {"count": department_manager_service.count(db)}