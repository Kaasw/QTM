from pydantic import BaseModel
from datetime import date
from typing import Optional


class DepartmentBase(BaseModel):
    dept_no: str
    dept_name: str


class DepartmentList(DepartmentBase):
    class Config:
        orm_mode = True 

class DepartmentCreate(DepartmentBase):
    pass  

class DepartmentUpdate(BaseModel):
    dept_no: Optional[str] = None  
    dept_name: Optional[str] = None

    class Config:
        orm_mode = True

class DeptEmpBase(BaseModel):
    emp_no: int
    dept_no: str
    from_date: date
    to_date: Optional[date] = None  #


class DeptEmpList(DeptEmpBase):
    class Config:
        orm_mode = True


class DeptEmpCreate(DeptEmpBase):
    pass


class DeptEmpUpdate(BaseModel):
    emp_no: Optional[int] = None
    dept_no: Optional[str] = None
    from_date: Optional[date] = None
    to_date: Optional[date] = None

    class Config:
        orm_mode = True

class DeptManagerBase(BaseModel):
    emp_no: int
    dept_no: str
    from_date: date
    to_date: Optional[date] = None 


class DeptManagerList(DeptManagerBase):
    class Config:
        orm_mode = True


class DeptManagerCreate(DeptManagerBase):
    pass


class DeptManagerUpdate(BaseModel):
    emp_no: Optional[int] = None
    dept_no: Optional[str] = None
    from_date: Optional[date] = None
    to_date: Optional[date] = None

    class Config:
        orm_mode = True