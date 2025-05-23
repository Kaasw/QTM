from pydantic import BaseModel, Field
from datetime import date
from enum import Enum
from typing import List, Optional

class Gender(str, Enum):
    M = "M"
    F = "F"

class EmployeeCreate(BaseModel):
    emp_no: int 
    birth_date: date
    first_name: str
    last_name: str
    gender: Gender
    hire_date: date

    class ConfigDict:
        from_attributes = True  

class EmployeeUpdate(BaseModel):
    birth_date: date
    first_name: str
    last_name: str
    gender: Gender
    hire_date: date

    class ConfigDict:
        from_attributes = True  

class EmployeeList(EmployeeCreate):
    pass

class TitleBase(BaseModel):
    emp_no: int
    title: str
    from_date: date
    to_date: Optional[date] = None  


class TitleList(TitleBase):
    class Config:
        orm_mode = True


class TitleCreate(TitleBase):
    pass


class TitleUpdate(BaseModel):
    emp_no: Optional[int] = None
    title: Optional[str] = None
    from_date: Optional[date] = None
    to_date: Optional[date] = None

    class Config:
        orm_mode = True

class SalaryBase(BaseModel):
    emp_no: int
    salary: int
    from_date: date
    to_date: Optional[date] = None  # to_date can be null (e.g., current salary)


class SalaryList(SalaryBase):
    class Config:
        orm_mode = True


class SalaryCreate(SalaryBase):
    pass


class SalaryUpdate(BaseModel):
    emp_no: Optional[int] = None
    salary: Optional[int] = None
    from_date: Optional[date] = None
    to_date: Optional[date] = None

    class Config:
        orm_mode = True