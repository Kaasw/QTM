from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from _api import deps
from .service import *

router = APIRouter()

@router.post("/")
def add_title_api(emp_id: int = Body(...), title: str = Body(...), db: Session = Depends(deps.get_db)):
    return add_title(emp_id=emp_id, title=title, db=db)

@router.get("/all")
def get_all_titles_api(limit: int, skip:int, db: Session = Depends(deps.get_db)):
    return list_titles(db=db, limit=limit, skip=skip)

@router.delete("/title")
def delete_title_api(emp_id: int, db: Session = Depends(deps.get_db)):
    return remove_title(emp_id=emp_id, db=db)

@router.put("/update")
def update_title_api(data: TitleUpdate = Body(...), db: Session = Depends(deps.get_db)):
    return update_title(data, db)