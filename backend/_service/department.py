from .base import BaseService
from _api.deps import get_db
from schema.department import *
from sqlalchemy.orm import Session
from model.model import *

class DepartmentBaseService(BaseService[DepartmentList, DepartmentCreate, DepartmentUpdate]):
    def get_department(self, id: str, db: Session):
        return super().get(db, id)

class DepartmentManagerService(BaseService[DeptManagerList, DeptManagerCreate, DeptManagerUpdate]):
    pass

class DepartmentEmpService(BaseService[DeptEmpList, DeptEmpCreate, DeptEmpUpdate]):
    pass

department_service = DepartmentBaseService(Departments)
department_manager_service = DepartmentManagerService(DeptManager)
department_employee_service = DepartmentEmpService(DeptEmp)

