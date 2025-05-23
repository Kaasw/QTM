from fastapi import APIRouter
from pymongo import UpdateOne
from starlette.middleware.sessions import SessionMiddleware

from _api.employee.router import router as employee_router
from _api.department.router import router as department_router
from _api.department_manager.router import router as department_manager_router
from _api.department_employee.router import router as department_employee_router
from _api.salary.router import router as salary_router
from _api.employee_title.router import router as employee_title_router
api_app = APIRouter()

# Set up the middleware to read the request session
# auth_app.add_middleware(SessionMiddleware)

api_app.include_router(employee_router, tags=["employee"], prefix="/employee")
api_app.include_router(department_router, tags=["department"], prefix="/department")
api_app.include_router(department_manager_router, tags=["department_manager"], prefix="/department_manager")
api_app.include_router(department_employee_router, tags=["department_employee"], prefix="/department_employee")
api_app.include_router(salary_router, tags=["salary"], prefix="/salary")
api_app.include_router(employee_title_router, tags=["employee_title"], prefix="/employee_title")
