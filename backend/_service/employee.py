from .base import BaseService
from _api.deps import get_db
from schema.employee import *
from sqlalchemy.orm import Session
from model.model import *

class EmployeeBase(BaseService[EmployeeList, EmployeeCreate, EmployeeUpdate]):
    def get_employee(self, id: int, db: Session):
        return super().get(db, id)
    

employee_service = EmployeeBase(Employees)
employee_salary_service = EmployeeBase(Salaries)
employee_title_service = EmployeeBase(Titles)